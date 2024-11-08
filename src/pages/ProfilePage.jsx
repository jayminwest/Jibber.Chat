import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    home_mountain: '',
    skier_type: '',
    bio: '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
        setFormData({
          home_mountain: profileData?.home_mountain || '',
          skier_type: profileData?.skier_type || '',
          bio: profileData?.bio || '',
        });

        const { data: chatData, error: chatError } = await supabase
          .from('chat_history')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (chatError) throw chatError;
        setChatHistory(chatData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    if (user) getProfile();
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      if (formData.skier_type && !['beginner', 'intermediate', 'advanced', 'expert'].includes(formData.skier_type)) {
        throw new Error('Invalid skier type');
      }

      const updateData = {
        updated_at: new Date().toISOString(),
      };

      if (formData.home_mountain?.trim()) {
        updateData.home_mountain = formData.home_mountain.trim();
      }
      if (formData.skier_type) {
        updateData.skier_type = formData.skier_type;
      }
      if (formData.bio?.trim()) {
        updateData.bio = formData.bio.trim();
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile(prev => ({ ...prev, ...updateData }));
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Error updating profile');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await supabase.from('chat_history').delete().eq('user_id', user.id);
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.updateUser({ data: { deleted: true } });
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Error deleting profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Container */}
        <div className="space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700"></div>
            <div className="relative px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
                <div className="-mt-16 relative">
                  <img
                    src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${user?.email}`}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg bg-white"
                  />
                </div>
                <div className="mt-6 sm:mt-2 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{profile?.full_name || 'User'}</h1>
                  <p className="text-sm text-gray-500">Member since {new Date(profile?.created_at).toLocaleDateString()}</p>
                </div>
                <div className="mt-6 sm:mt-2 flex space-x-3">
                  <button
                    onClick={() => editing ? handleUpdateProfile() : setEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Profile Details</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Home Mountain</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.home_mountain}
                    onChange={(e) => setFormData({ ...formData, home_mountain: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your home mountain"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile?.home_mountain || 'Not set'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Skier Type</label>
                {editing ? (
                  <select
                    value={formData.skier_type}
                    onChange={(e) => setFormData({ ...formData, skier_type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select type</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile?.skier_type || 'Not set'}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                {editing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile?.bio || 'No bio yet'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Chat History Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Conversations</h2>
            <div className="space-y-6">
              {chatHistory.map((chat) => (
                <div key={chat.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">You asked:</p>
                    <span className="text-xs text-gray-500">
                      {new Date(chat.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mb-4">{chat.user_message}</p>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">AI Response:</p>
                    <p className="text-sm text-gray-800">{chat.ai_response}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Profile</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete your profile? This action cannot be undone and will remove all your data.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

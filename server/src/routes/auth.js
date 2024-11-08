const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.post('/google-signin', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.CLIENT_URL}/auth/callback`
      }
    });

    if (error) throw error;

    return res.status(200).json({
      url: data.url
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    return res.status(200).json({
      message: 'Logout successful'
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;

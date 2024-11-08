const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const openai = require('../config/openai');

router.post('/message', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Get response from OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const aiResponse = completion.data.choices[0].message.content;

    // Store the conversation in Supabase
    const { data, error } = await supabase
      .from('conversations')
      .insert([
        {
          user_id: userId,
          user_message: message,
          ai_response: aiResponse,
          timestamp: new Date().toISOString(),
        }
      ]);

    if (error) throw error;

    return res.status(200).json({
      message: 'Message processed successfully',
      response: aiResponse,
      conversation: data
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { userId } = req.query;

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      history: data
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;

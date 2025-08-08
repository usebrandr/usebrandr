// openai-proxy.js
// Usage:
// 1. Run `npm install express axios dotenv cors`
// 2. Create a .env file in this folder with: OPENAI_API_KEY=sk-...
// 3. Start with: node openai-proxy.js
// 4. Frontend: POST to http://localhost:3001/api/openai

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/openai', async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('OpenAI proxy running on http://localhost:3001')); 
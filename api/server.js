const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.get('/api/faqs', (req, res) => {
  const faqsPath = path.join(__dirname, 'faqs.json');
  fs.readFile(faqsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Không thể đọc file FAQ" });
    }
    res.json(JSON.parse(data));
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok", message: "API is healthy" });
});

app.listen(PORT, () => {
  console.log(`API Server (Mock DB) đang chạy tại http://localhost:${PORT}`);
});
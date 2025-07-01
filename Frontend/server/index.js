const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Add this route for "/"
app.get('/', (req, res) => {
  res.send('Node.js Backend is Running 🚀');
});

// Example API route
app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello from Node backend!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

const express = require('express');
const { ObjectId } = require('mongodb');
const connectDB = require('./db');

const app = express();
const PORT = 3000;

app.get('/user-dashboard/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const db = await connectDB();
    const users = db.collection('users');
    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      dashboardDetails: user.dashboardDetails, 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
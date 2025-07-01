const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Dashboard/user-dashboard');
const User = require('./models/User');
const app = express();
const PORT = 5000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://achinthaabeysinghe956:CiQ8JSsBvZtSTS1m@finalproject.86tq8qa.mongodb.net/?retryWrites=true&w=majority&appName=Finalproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

// Clerk webhook endpoint
app.post('/api/clerk-webhook', async (req, res) => {
  try {
    const event = req.body;
    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = event.data;
      const email = email_addresses[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(' ');
      await User.findOneAndUpdate(
        { clerkId: id },
        { email, name, clerkId: id },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    res.status(200).json({ received: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User registration route
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
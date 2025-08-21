const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const session = require('express-session');
app.use(session({ secret: process.env.SESSION_SECRET || 'secret', resave: false, saveUninitialized: false }));
const passport = require('./auth/google');
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Fp:0x800@finalproject.cicv4nv.mongodb.net/?retryWrites=true&w=majority&appName=Finalproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/user/events'));
app.use('/api/bookings', require('./routes/user/bookings'));
app.use('/api/favorites', require('./routes/user/favorites'));
app.use('/api/activities', require('./routes/user/activities'));
app.use('/api/packages', require('./routes/user/packages'));
app.use('/api/event-types', require('./routes/user/eventTypes'));
app.use('/api/payments', require('./routes/user/payments'));
app.use('/api/user/profile', require('./routes/user/profile'));

app.use('/api/admin', require('./routes/admin/admin'));
app.use('/api/admin', require('./routes/admin/admin-messages'));

app.use('/api/staff/packages', require('./routes/staff/packages'));
app.use('/api/staff/services', require('./routes/staff/services'));
app.use('/api/user-messages', require('./routes/user-messages'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

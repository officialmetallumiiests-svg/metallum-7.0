const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
require('./models/user');
require('./models/registration');
require('./services/passport');

const connectDB = require('./config/db');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Allow cookies
}));
app.use(express.json());

// Cookie Session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [process.env.COOKIE_KEY || 'default_secret_key']
    })
);

// Polyfill for Passport 0.6+ with cookie-session
app.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        };
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb();
        };
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
connectDB();

// Google Auth Routes
app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('http://localhost:5173/');
    }
);

app.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('http://localhost:5173');
    });
});

app.get('/auth/current_user', (req, res) => {
    res.send(req.user || null);
});

// API Routes
app.use('/api/register', registrationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

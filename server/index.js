const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
require('./models/user');
const fs = require('fs');
require('./models/registration');
require('./models/accommodation');
require('./services/passport');

const connectDB = require('./config/db');
const registrationRoutes = require('./routes/registrationRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');

const app = express();

// Middleware
const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').trim().replace(/^['"]|['"]$/g, ""); // Sanitize env var

app.use(cors({
    origin: clientUrl, // Allow frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Allow cookies
}));
app.use(express.json());

// Trust proxy (Required for Render/Vercel/Heroku to pass secure cookies)
app.set('trust proxy', 1);

// Cookie Session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [process.env.COOKIE_KEY || 'default_secret_key'],
        secure: process.env.NODE_ENV === 'production', // True in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // None for cross-site
        httpOnly: true
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
    (req, res, next) => {
        // Guard: Check if Google Strategy is loaded to prevent crash
        const strategies = passport._strategies;
        if (!strategies || !strategies.google) {
            console.error("Attempted Google Auth but strategy not loaded (likely missing env vars)");
            return res.status(500).send("Server Logic Error: Google Auth not configured.");
        }
        next();
    },
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect(`${clientUrl}/`);
    }
);

app.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect(clientUrl);
    });
});

app.get('/auth/current_user', (req, res) => {
    res.send(req.user || null);
});



// API Routes
app.use('/api/register', registrationRoutes);
app.use('/api/accommodation', accommodationRoutes);

// Serve static assets in production (or if build exists)
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '../client/dist');

    if (fs.existsSync(clientBuildPath)) {
        app.use(express.static(clientBuildPath));

        app.get('*all', (req, res) => {
            res.sendFile(path.resolve(clientBuildPath, 'index.html'));
        });
    } else {
        // Fallback if build files are missing (e.g. API-only mode)
        app.get('/', (req, res) => {
            res.send('API is running successfully. Frontend build not found.');
        });
    }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Global Error Handlers to prevent 503 Crashes
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message, err.stack);
    // process.exit(1); // Keep alive for debugging in this specific context if needed, but best to restart.
    // limiting impact:
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥');
    console.error(err.name, err.message, err.stack);
});

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn("⚠️  WARNING: Google Client ID/Secret not found. Google Auth will fail.");
} else {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
                proxy: true
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user already exists
                    const existingUser = await User.findOne({ googleId: profile.id });

                    if (existingUser) {
                        return done(null, existingUser);
                    }

                    // Create new user
                    const user = await new User({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        photoURL: profile.photos[0].value
                    }).save();

                    done(null, user);
                } catch (error) {
                    console.error("Error in Google Strategy Verify Callback:", error);
                    done(error, null);
                }
            }
        )
    );
}

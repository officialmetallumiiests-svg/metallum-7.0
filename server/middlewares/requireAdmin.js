module.exports = (req, res, next) => {
    // 1. Check if user is logged in (usually requireLogin runs first, but good strict check)
    if (!req.user) {
        return res.status(401).json({ error: 'You must log in first!' });
    }

    // 2. Check if user role is 'admin'
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    next();
};

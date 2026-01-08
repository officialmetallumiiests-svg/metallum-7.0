const express = require('express');
const router = express.Router();
const {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking
} = require('../controllers/accommodationController');

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

// Public route (logged in users) to create booking
router.post('/', requireLogin, createBooking);

// Admin routes to view/manage bookings
router.get('/', requireLogin, requireAdmin, getAllBookings);
router.put('/:id', requireLogin, requireAdmin, updateBooking);
router.delete('/:id', requireLogin, requireAdmin, deleteBooking);

module.exports = router;

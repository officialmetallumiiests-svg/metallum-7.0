const mongoose = require('mongoose');
const Accommodation = mongoose.model('Accommodation');

exports.createBooking = async (req, res) => {
    const { name, email, phone, college } = req.body;

    try {
        const newBooking = new Accommodation({
            name,
            email,
            phone,
            college,
            userId: req.user ? req.user.id : null,
            status: 'Pending'
        });

        await newBooking.save();
        res.status(201).json({ success: true, data: newBooking });
    } catch (err) {
        console.error("Accommodation Booking Error:", err);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Accommodation.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (err) {
        console.error("Fetch Bookings Error:", err);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Accommodation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        console.error("Update Booking Error:", err);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Accommodation.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Delete Booking Error:", err);
        res.status(500).json({ error: 'Server Error' });
    }
};

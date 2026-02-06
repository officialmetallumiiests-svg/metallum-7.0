const Registration = require('../models/registration');

// POST: register for event
exports.createRegistration = async (req, res) => {
  try {
    const { name, email, phone, college, branch, year, event, teamName, tshirtSize, tshirtName, transactionId, amount, teammates } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required' });
    }

    // Check if user already registered for this event
    const existingRegistration = await Registration.findOne({
      user: req.user.id,
      event: event
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }

    const registration = await Registration.create({
      user: req.user.id, // Link to logged-in user
      name,
      email,
      phone,
      college,
      branch,
      year,
      event,
      teamName,
      tshirtSize,
      tshirtName,
      transactionId,
      amount,
      teammates,
      paymentDate: transactionId ? new Date() : undefined
    });

    res.status(201).json({
      message: 'Registration successful',
      data: registration
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE: delete registration
exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    await Registration.findByIdAndDelete(id);
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT: update registration (details or status)
exports.updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const registration = await Registration.findByIdAndUpdate(id, updatedData, { new: true });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ message: 'Registration updated', data: registration });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

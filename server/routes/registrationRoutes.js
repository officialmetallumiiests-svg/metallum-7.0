const express = require('express');
const router = express.Router();
const {
  createRegistration,
  getAllRegistrations,
  deleteRegistration,
  updateRegistration
} = require('../controllers/registrationController');

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

router.post('/', requireLogin, createRegistration);
router.get('/', requireLogin, requireAdmin, getAllRegistrations);
router.delete('/:id', requireLogin, requireAdmin, deleteRegistration);
router.put('/:id', requireLogin, requireAdmin, updateRegistration);

module.exports = router;

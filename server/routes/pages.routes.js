const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/team', (req, res) => {
  res.render('team');
});

router.get('/sponsors', (req, res) => {
  res.render('sponsors');
});

router.get('/accommodation', (req, res) => {
  res.render('accommodation');
});

module.exports = router;

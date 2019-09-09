const router = require('express').Router();
const formRoutes = require('./form');

router.use('/submit', formRoutes);

module.exports = router;

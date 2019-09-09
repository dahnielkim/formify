const router = require('express').Router();
const formController = require('../../controllers/form');

// route for sending email
router.route('/submit').post(formController.sendEmail);

module.exports = router;

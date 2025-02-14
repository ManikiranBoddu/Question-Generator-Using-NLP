const express = require('express');
const router = express.Router();
const { getQuestions } = require('../controllers/questionController'); // Updated to match the controller function

router.post('/generate', getQuestions); // Now using the correct function name

module.exports = router;

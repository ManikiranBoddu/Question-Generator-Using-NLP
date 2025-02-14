const axios = require('axios');

// Function to get questions from the Flask API
const getQuestionsFromFlaskAPI = async (preferences) => {
    try {
        const response = await axios.post('http://127.0.0.1:5001/generate-questions', {
            preferences: preferences
        });
        return response.data.questions;
    } catch (error) {
        console.error('Error fetching questions from Flask API:', error);
        throw new Error('Failed to fetch questions from Flask API');
    }
};

// Controller function for handling request to generate questions
exports.getQuestions = async (req, res) => {
    const { preferences } = req.body;

    // Ensure preferences are provided
    if (!preferences) {
        return res.status(400).json({ error: "Preferences are required" });
    }

    try {
        // Fetch questions from Flask API
        const questions = await getQuestionsFromFlaskAPI(preferences);
        return res.status(200).json({ questions });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Failed to generate questions" });
    }
};

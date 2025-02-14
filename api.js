import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001'; // Flask server URL

const generateQuestions = async (preferences) => {
    const response = await fetch("http://localhost:5001/generate-questions", {  // ✅ Correct endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};



// Export API functions
const api = { generateQuestions };
export default api;

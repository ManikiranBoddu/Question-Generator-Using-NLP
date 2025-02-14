import { useState } from 'react';
import api from '../services/api';

const QuestionForm = () => {
    const [preferences, setPreferences] = useState({
        MCQ: false,
        'Fill in the blanks': false,
        Descriptive: false,
        topic: ''
    });

    const [questions, setQuestions] = useState([]);  // Ensuring default is an array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (event) => {
        const { name, checked, value } = event.target;
        setPreferences((prev) => ({
            ...prev,
            [name]: name === 'topic' ? value : checked
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const selectedTypes = Object.keys(preferences).filter(
            (key) => preferences[key] === true
        );

        if (selectedTypes.length === 0 || !preferences.topic.trim()) {
            setError("Please select at least one question type and enter a topic.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const requestData = [{ types: selectedTypes, topic: preferences.topic }];
            console.log("Sending request:", requestData);

            const response = await api.generateQuestions(requestData);
            console.log("API Response:", response);

            // Ensure response is properly formatted
            if (response && Array.isArray(response.data)) {
                setQuestions(response.data);
            } else {
                setQuestions([]);  // Avoid undefined errors
                setError("Invalid response from the server.");
            }
        } catch (error) {
            setError("Error fetching questions. Please try again.");
            console.error("API Error:", error);
            setQuestions([]); // Ensure array reset on failure
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    <input type="checkbox" name="MCQ" checked={preferences.MCQ} onChange={handleChange} />
                    MCQ
                </label>
                <label>
                    <input type="checkbox" name="Fill in the blanks" checked={preferences['Fill in the blanks']} onChange={handleChange} />
                    Fill in the blanks
                </label>
                <label>
                    <input type="checkbox" name="Descriptive" checked={preferences.Descriptive} onChange={handleChange} />
                    Descriptive
                </label>
            </div>

            {/* Topic input */}
            <div>
                <label>
                    Topic or Subject:
                    <textarea name="topic" value={preferences.topic} onChange={handleChange} rows="3" placeholder="Enter topic or subject for questions" />
                </label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Questions'}
            </button>

            {/* Error Handling */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display generated questions */}
            <ul>
                {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((q, idx) => (
                        <li key={idx}>
                            {q.type === 'MCQ' ? (
                                <div>
                                    <p>{q.question}</p>
                                    <ul>
                                        {q.options && q.options.map((option, index) => (
                                            <li key={index}>{option}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>{q.question}</p>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No questions generated.</p>
                )}
            </ul>
        </form>
    );
};

export default QuestionForm;

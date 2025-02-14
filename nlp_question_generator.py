from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to generate different types of questions
def generate_questions(preferences):
    questions = []

    if 'MCQ' in preferences:
        questions.append({
            'type': 'MCQ',
            'question': 'What is the capital of France?',
            'options': ['Paris', 'London', 'Rome', 'Berlin'],
            'answer': 'Paris'
        })

    if 'Fill in the blanks' in preferences:
        questions.append({
            'type': 'Fill in the blanks',
            'question': 'The _____ is the largest mammal.',
            'answer': 'blue whale'
        })

    if 'Descriptive' in preferences:
        questions.append({
            'type': 'Descriptive',
            'question': 'Describe the water cycle.'
        })

    return questions

@app.route('/generate-questions', methods=['POST'])
def generate_questions_endpoint():
    try:
        data = request.get_json()

        # Debugging log
        print("📥 Received Request Data:", data)

        # Ensure valid input
        if not data or "preferences" not in data or not isinstance(data["preferences"], list):
            return jsonify({"error": "Invalid request. Provide a valid 'preferences' list."}), 400

        questions = generate_questions(data["preferences"])

        # Debugging log
        print("📤 Generated Questions:", questions)

        return jsonify({"questions": questions})

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": "Server error"}), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "running"}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, use_reloader=False, debug=True)  # Enable debug mode

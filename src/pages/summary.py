from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Set your Groq API key here
GROQ_API_KEY = "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"  # <-- Use env var in production
groq_client = Groq(api_key=GROQ_API_KEY)

# Function to call Groq for summarization
def summarize_text(text):
    try:
        response = groq_client.chat.completions.create(
            model="llama3-70b-8192",  # ✅ UPDATED MODEL
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that summarizes news articles clearly and concisely."
                },
                {
                    "role": "user",
                    "content": f"Summarize the following news article:\n{text}"
                }
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error during summarization: {str(e)}"

# Route to handle POST request with text
@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    user_text = data.get("text", "")

    if not user_text.strip():
        return jsonify({"error": "No input text provided"}), 400

    summary = summarize_text(user_text)
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)

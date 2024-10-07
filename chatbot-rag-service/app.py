from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core import StorageContext, load_index_from_storage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import hashlib

# Load environment variables
load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = openai_api_key

app = Flask(__name__)
CORS(app)

# Global index object and cache for frequently used responses
index = None
cache = {}

# Function to build the index (run this once)
def build_index():
    try:
        print("Building the index...")
        documents = SimpleDirectoryReader('documents/').load_data()
        print(f"Loaded {len(documents)} document(s).")

        llm = ChatOpenAI(
            temperature=0.8,  # Balanced creativity
            top_p=0.9,
            model_name='gpt-4o-mini',  # Cost-effective model
            openai_api_key=openai_api_key,
            max_tokens=300  # Keep responses short and focused
        )

        index = VectorStoreIndex.from_documents(documents, llm=llm)
        index.storage_context.persist(persist_dir='./storage')
        print("Index built and saved successfully.")
        return index
    except Exception as e:
        print(f"An error occurred while building the index: {e}")

# Load index from storage
def load_index():
    global index
    if not index:
        try:
            print("Loading index from storage...")
            storage_context = StorageContext.from_defaults(persist_dir='./storage')
            index = load_index_from_storage(storage_context)
            print("Index loaded successfully.")
        except Exception as e:
            print(f"An error occurred while loading the index: {e}")
    return index

# Helper function to hash user queries (for caching purposes)
def hash_query(query):
    return hashlib.sha256(query.encode()).hexdigest()

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('text').lower()  # Convert to lowercase to standardize

        if not user_message:
            return jsonify({'error': 'No text provided'}), 400

        # First, check if the query has been cached to save computation costs
        query_hash = hash_query(user_message)
        if query_hash in cache:
            return jsonify({'data': cache[query_hash]}), 200

        # Load the index if not already loaded
        index = load_index()

        # Build a query engine to handle any query dynamically
        query_engine = index.as_query_engine(
            prompt_template="""
            You are Zara, a witty, fun, and creative academic assistant. Your goal is to help students manage stress, study effectively, and stay motivated.
            Use a lighthearted, humorous tone in your responses. Feel free to make jokes, use funny analogies, and be creative while giving practical advice.
            Always ensure that your advice is helpful but deliver it in a fun, engaging way that makes students smile.
            when asked about subject look at syllabus and give help.
            Use the academic documents (syllabus, schedule, faculty details) to provide accurate information, but inject humor and creativity into your responses.
            """
        )



        # Send the user's query to the model and let the model handle everything dynamically
        print(f"Querying the index with user message: {user_message}")
        response = query_engine.query(user_message)
        bot_message = response.response

        # Cache the response for future queries
        cache[query_hash] = bot_message

        # Log for debugging
        print(f"User message: {user_message}")
        print(f"Bot response: {bot_message}")

        # Return the model's response
        return jsonify({'data': bot_message}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the app on port 5001 or any port you prefer
    if not os.path.exists('./storage'):
        print("Index not found, building a new one...")
        index = build_index()
    else:
        print("Loading index from storage...")
        index = load_index()
    app.run(host='0.0.0.0', port=5001)

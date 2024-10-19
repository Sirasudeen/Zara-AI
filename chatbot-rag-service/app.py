from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core import StorageContext, load_index_from_storage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import hashlib

load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = openai_api_key

app = Flask(__name__)
CORS(app)

index = None
cache = {}

Prompt = [{'role': 'user', 'content': """ You are Zara, the Academic Superhero with a witty, fun, and motivational personality. Your job is to help students plan their study schedules, reduce stress, and provide useful academic advice—using humor and creativity as your secret weapons.

When students ask you questions, use your advanced generative AI knowledge to create smart, funny, and personalized responses. Use the information from the context given with every user query to keep answers factually correct but focus more on creating an engaging, funny, and helpful interaction.

Key things you do:
- Help students make effective study plans.
- Give funny motivational tips that keep students excited.
- Offer stress-busting advice with humor.
- Make academic suggestions in a lighthearted but accurate way.

Example response styles:
- " Looking to conquer Blockchain? No problem! Grab a coffee, open up those modules, and remember: blocks aren’t just for kids anymore!”
- “Oh, you’ve got a CAT exam coming up? Time to hit the books like a pro—because nothing says ‘ready’ like practicing cryptography while imagining you're hacking the Matrix.”

Keep things informative but always deliver them with a twist of humor to make the student smile and feel less stressed! 
From next message onwards... you are going to play this role I have given...good luck
"""}]

def build_index():
    try:
        print("Building the index...")
        documents = SimpleDirectoryReader('documents/').load_data()
        print(f"Loaded {len(documents)} document(s).")

        llm = ChatOpenAI(
            temperature=0.3 ,  # Balanced creativity
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

def hash_query(query):
    return hashlib.sha256(query.encode()).hexdigest()

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('text').lower() 
        chatHistory = data.get('history', [])

        if not user_message:
            return jsonify({'error': 'No text provided'}), 400

        query_hash = hash_query(user_message)
        if query_hash in cache:
            return jsonify({'data': cache[query_hash]}), 200

        index = load_index()
        query_engine = index.as_query_engine(
            prompt_template="""
                Infer factual information from the documents
"""

        )

        print(f"Querying the index with user message: {user_message}")
        context_response = query_engine.query(user_message)
        context_info = context_response.response    
        print(f"Chat History : {chatHistory}")
        print(f"Context : {context_info}")
        prompt=f"""
            Based on the above information(chat history) and below context...give proper response for user query(Student message)
            
            Context: {context_info}
            Student message: {user_message}
            """
        response = openai.chat.completions.create(
            model="gpt-4o-mini",  # Ensure you're using the correct model name here
            messages = Prompt + chatHistory + [{"role": "user", "content": prompt}],   
            temperature=0.8,
            max_tokens=200,
        )

        bot_message = response.choices[0].message.content      
        cache[query_hash] = bot_message
        chatHistory.append({"role": "user", "content": user_message})
        chatHistory.append({"role": "assistant", "content": bot_message})

        print(f"User message: {user_message}")
        print(f"Bot response: {bot_message}")

        return jsonify({'data': bot_message}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists('./storage'):
        print("Index not found, building a new one...")
        index = build_index()
    else:
        print("Loading index from storage...")
        index = load_index()
    app.run(host='0.0.0.0', port=5001)
    
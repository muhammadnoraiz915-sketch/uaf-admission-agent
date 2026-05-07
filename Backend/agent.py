from groq import Groq
from dotenv import load_dotenv
from database import get_db
import os

load_dotenv()

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_uaf_context():
    db = get_db()
    programs = list(db.programs.find({}, {"_id": 0}))
    faqs = list(db.faqs.find({}, {"_id": 0}))
    
    context = "UAF (University of Agriculture Faisalabad) ke programs:\n\n"
    for p in programs:
        context += f"Program: {p['program_name']}\n"
        context += f"Faculty: {p['faculty']}\n"
        context += f"Duration: {p['duration']}\n"
        context += f"Eligibility: {p['eligibility']['minimum_marks']}\n"
        context += f"Campus: {', '.join(p['campus'])}\n\n"
    
    context += "\nFAQs:\n"
    for f in faqs:
        context += f"Q: {f['question']}\nA: {f['answer']}\n\n"
    
    return context

def ask_agent(user_question: str) -> str:
    context = get_uaf_context()
    
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": f"""You are a helpful admission assistant for University of Agriculture Faisalabad (UAF).
Answer questions based only on this information:

{context}

Rules:
- Answer in the same language as the question (Urdu/English)
- Be helpful and friendly
- If information is not available, say so politely
- Keep answers concise and clear"""
            },
            {
                "role": "user", 
                "content": user_question
            }
        ]
    )
    
    return response.choices[0].message.content
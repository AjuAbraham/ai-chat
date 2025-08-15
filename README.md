# Persona Chat with Hitesh Sir & Piyush Sir

This project is a **Next.js** application that allows users to chat with AI personas of **Hitesh Sir** and **Piyush Sir**. Using **Google's Gemini model**, each persona responds like the respective person, remembering the conversation context and replying in their style.

---

## Features

- Two AI personas: **Hitesh Sir** and **Piyush Sir**  
- Each persona responds as if they are the real person, following a **system prompt**  
- Conversation memory: the AI remembers previous messages in the session  
- Two separate API endpoints for handling messages to each persona  
- Built using **Next.js** and **JavaScript**  

---

## Tech Stack

- **Next.js** – React framework for server-side and API routes  
- **JavaScript** – For API endpoints and frontend logic  
- **Gemini model** – Conversational AI via OpenAI SDK  
- **TailwindCSS** – Optional styling for chat UI  

---

## API Endpoints

### 1. Hitesh Sir Endpoint

**URL:** `POST /api/hitesh`

**Description:**  
Send chat messages to Hitesh Sir persona. The AI will respond in the style of Hitesh Sir, remembering previous messages in the session.

**Request Body Example:**

```json
{
  "messages": [
    { "role": "user", "content": "Hello Hitesh Sir!" }
  ]
}

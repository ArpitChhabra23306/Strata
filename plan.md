# AI Browzer - Implementation Plan

This document outlines the roadmap for building our Perplexity-like AI Browser. It includes what we have accomplished so far, and the next steps for both the backend and frontend architectures.

## What We Have Done So Far

- **Backend Foundation:** Set up an Express.js server running on Bun.
- **AI Integration:** Implemented the `POST /conversation` endpoint which takes a user query, performs a live web search using **Tavily**, and engineers a prompt.
- **Streaming Response:** Integrated **OpenAI (GPT-4o-mini)** to stream the response back to the client in real-time, including a structured `<ANSWER>`, follow-up questions, and a simplified JSON array of source URLs.

---

## Proposed Changes

### Backend Roadmap

We will expand the Express/Bun backend to support user accounts, persistent chat history, and monetization.

- [ ] **1. Add Authentication:** Secure endpoints so only authenticated users can make queries.
- [ ] **2. Add Database Layer (Supabase & Prisma ORM):** Integrate Supabase to securely store application data, using Prisma ORM for schema management and type-safe database queries.
- [ ] **3. Create Database Tables:**
  - `users`: To store user profiles.
  - `credits`: To track usage and limit API calls per user.
  - `conversations`: To persist chat history for the new follow-up features.
- [ ] **4. Implement `/conversation/follow_up` Endpoint:**
  - Retrieve the existing chat history from the Supabase database.
  - Forward the full history to the LLM.
  - _Context Engineering:_ Summarize or format initial setup messages before sending.
  - Stream the new response back to the user.
- [ ] **5. Add Stripe Payments (TODO):** Allow users to purchase more credits once they run out.

---

### Frontend Roadmap

We will replace the current basic `index.html` scaffold with a modern web application framework.

- [ ] **1. Initialize React/Next.js:** Set up a robust frontend framework to handle complex state and routing.
- [ ] **2. Authentication UI:** Build a login/signup popup/modal integrated with Supabase Auth.
- [ ] **3. Page Construction:**
  - **Landing Page:** A beautiful, responsive home page introducing the AI Browzer.
  - **Conversation UI:** A chat interface that handles the real-time streaming data from our backend, renders markdown, displays clickable source links, and shows follow-up questions as interactive buttons.

// - Arpit@96929692

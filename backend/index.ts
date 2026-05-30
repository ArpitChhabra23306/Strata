import express from "express";
import dotenv from "dotenv";
import { tavily } from '@tavily/core';
import OpenAI from "openai";
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from "./prompt";

dotenv.config();

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();

app.use(express.json());

app.post("/conversation", async (req, res) => {
    // step 1 - get the query from the user
    const query = req.body.query;

    // step 2 - make sure user has access/credits to hit the endpoint

    // step 3 - check if we have web search indexed for a similar query, if so return that

    // step 4 - if no, then we do a web search to gather sources
    const webSearchResponses = await client.search(query, {
        searchDepth: "advanced"
    })

    const webSearchResults = webSearchResponses.results; // this is an array of search results with metadata like source, title, snippet, etc.

    // step 5 - do some context engineering on the prompt + web search responses

    // step 6 - hit the LLM with the engineered prompt and stream back the response
    // hit the llm with chatgpt api
    const prompt = PROMPT_TEMPLATE
        .replace("{{WEB_SEARCH_RESULTS}}", JSON.stringify(webSearchResults))    
        .replace("{{USER_QUERY}}", query);

    const result = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt }
        ],
        max_tokens: 8000,
        stream: true
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // step 6 - collect full response while streaming it
    let fullText = '';
    for await (const textPart of result) {
        const content = textPart.choices[0]?.delta?.content || '';
        fullText += content;
        res.write(content);
    }

    // step 7 - also stream back the sources and the follow up questions
    res.write("\n\n<SOURCES>\n");
    res.write(JSON.stringify(webSearchResults.map(result => ({ url: result.url }))));
    res.write("\n</SOURCES>\n");

    // step 8 - close the event stream
    res.end();
});

app.listen(3000);


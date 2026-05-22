import express from "express";
import { tavily } from '@tavily/core';

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });
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

    // step 6 - hit the LLM with the engineered prompt and return the response to the user

    // step 7 - also stream back the resources and the follow up questions (which we can get from another parallel LLM call)

    // step 8 - close the event stream and end the response
});

app.listen(3000);


async function test() {
    console.log("Sending query to backend...");
    const res = await fetch("http://localhost:3000/conversation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: "What is the current stock price of Apple?" })
    });

    if (!res.body) {
        console.error("No response body");
        return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        process.stdout.write(decoder.decode(value));
    }
}

test();

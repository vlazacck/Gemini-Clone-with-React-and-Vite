import{
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
}  from "@google/generative-ai";

// Replace process.env.GEMINI_API_KEY with your API key
const apiKey = "AIzaSyBOUhD2fs5NbIx6uKhs7ZtgASKVs6hAPJE";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    // Log result to inspect the response structure
    console.log(result);

    // Check if result.response has a `text` method
    if (result.response && typeof result.response.text === 'function') {
        const response = await result.response.text();
        console.log(response); // Log the actual response text
        return response;
    } 
    // If it's JSON
    else if (result.response && typeof result.response === 'object') {
        console.log(result.response);
        return JSON.stringify(result.response); // or handle JSON parsing if necessary
    } 
    else {
        throw new Error("Unexpected response format");
    }
}


export default run;

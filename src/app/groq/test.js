
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();


const Groq = require("groq-sdk");

const groqKey = process.env.NEXT_PUBLIC_GROQ_API_KEY; // Ensure the key name matches your .env file exactly

if (!groqKey) {
  console.error("Groq API Key is missing. Please check your .env file.");
  process.exit(1); // Exit the script if the key is not provided
}

// Initialize Groq SDK
const groq = new Groq({ apiKey: groqKey });



async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
}
  
main();



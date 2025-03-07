import { generateEmbedding } from './embeddingService.js';
import { queryVectors } from './pineconeClient.js';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Retrieves relevant data from Pinecone and generates an enhanced response using OpenAI.
 * 
 * @param {string} userQuery - The user's query.
 * @returns {Promise<Object>} - A promise that resolves to the enhanced response.
 * @throws {Error} - If the RAG process fails.
 */
export const generateEnhancedResponse = async (userQuery) => {
  try {
    // Generate embedding for the user query
    const queryEmbedding = await generateEmbedding(userQuery);

    // Retrieve relevant data from Pinecone
    const relevantData = await queryVectors(queryEmbedding);

    // Extract relevant text from the retrieved data
    const context = relevantData.map(item => item.metadata.text).join('\n');

    // Generate an enhanced response using OpenAI
    const aiResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 500,
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant. Use the following context to provide a detailed response to the user's query.`,
        },
        {
          role: 'user',
          content: `Context: ${context}\n\nUser Query: ${userQuery}`,
        },
      ],
    });

    const response = aiResponse.data.choices[0].message.content.trim();
    return { response, context };
  } catch (error) {
    console.error('Error in generateEnhancedResponse:', error);
    throw error;
  }
};
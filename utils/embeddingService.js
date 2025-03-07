import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import { upsertVectors, queryVectors } from './pineconeClient.js';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Generates an embedding for the given text using OpenAI's API.
 * 
 * @param {string} text - The text to generate an embedding for.
 * @returns {Promise<Array>} - A promise that resolves to the embedding vector.
 * @throws {Error} - If the embedding generation fails.
 */
export const generateEmbedding = async (text) => {
  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-3-large',
      input: text,
    });
    return response.data.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
};

/**
 * Upserts a text and its embedding into the Pinecone index.
 * 
 * @param {string} id - The unique identifier for the vector.
 * @param {string} text - The text to generate an embedding for and upsert.
 * @param {Object} metadata - Additional metadata to store with the vector.
 * @returns {Promise<void>} - A promise that resolves when the upsert operation is complete.
 * @throws {Error} - If the upsert operation fails.
 */
export const upsertText = async (id, text, metadata = {}) => {
  try {
    const embedding = await generateEmbedding(text);
    await upsertVectors([{ id, values: embedding, metadata }]);
  } catch (error) {
    console.error('Error upserting text:', error);
    throw error;
  }
};

/**
 * Queries the Pinecone index for similar vectors to the given text.
 * 
 * @param {string} text - The text to generate an embedding for and query.
 * @param {number} [topK=10] - The number of top similar vectors to return.
 * @returns {Promise<Array>} - A promise that resolves to an array of matched vectors.
 * @throws {Error} - If the query operation fails.
 */
export const querySimilarTexts = async (text, topK = 10) => {
  try {
    const embedding = await generateEmbedding(text);
    const results = await queryVectors(embedding, topK);
    return results || [];
  } catch (error) {
    console.error('Error querying similar texts:', error);
    throw error;
  }
};
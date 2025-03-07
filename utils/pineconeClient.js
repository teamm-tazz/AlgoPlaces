import { PineconeClient } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const pineconeClient = new PineconeClient();
pineconeClient.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
    host: 'https://algoplaces-index-kdx7z37.svc.aped-4627-b74a.pinecone.io', // Add your host URI here
});

const index = pineconeClient.Index('algoplaces-index');

/**
 * Upserts vectors into the Pinecone index.
 * 
 * @param {Array} vectors - An array of vectors to upsert. Each vector should be an object with 'id', 'values', and 'metadata' properties.
 * @returns {Promise<void>} - A promise that resolves when the upsert operation is complete.
 * @throws {Error} - If the upsert operation fails.
 */
export const upsertVectors = async (vectors) => {
    try {
        await index.upsert({ vectors });
    } catch (error) {
        console.error('Error upserting vectors:', error);
        throw error;
    }
};

/**
 * Queries the Pinecone index for similar vectors.
 * 
 * @param {Array} vector - The query vector to search for similar vectors.
 * @param {Number} [topK=10] - The number of top similar vectors to return.
 * @returns {Promise<Array>} - A promise that resolves to an array of matched vectors. Each match contains `id`, `score`, `values`, and `metadata`.
 * @throws {Error} - If the query operation fails.
 */
export const queryVectors = async (vector, topK = 10) => {
    try {
        const result = await index.query({
            vector,
            topK,
            includeValues: true,
            includeMetadata: true,
        });
        return result.matches;
    } catch (error) {
        console.error('Error querying vectors:', error);
        throw error;
    }
};
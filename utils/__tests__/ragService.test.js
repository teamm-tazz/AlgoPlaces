import { generateEnhancedResponse } from '../ragService.js';
import { generateEmbedding } from '../embeddingService.js';
import { queryVectors } from '../pineconeClient.js';
import { Configuration, OpenAIApi } from 'openai';

// Mock the Pinecone client and OpenAI API functions
jest.mock('../embeddingService.js', () => ({
  generateEmbedding: jest.fn(),
}));

jest.mock('../pineconeClient.js', () => ({
  queryVectors: jest.fn(),
}));

jest.mock('openai', () => {
  const mCreateChatCompletion = jest.fn();
  return {
    Configuration: jest.fn(),
    OpenAIApi: jest.fn().mockImplementation(() => ({
      createChatCompletion: mCreateChatCompletion,
    })),
  };
});

describe('RAG Service', () => {
  const testQuery = "What is the time complexity of quicksort?";

  it('should generate an enhanced response', async () => {
    // Mock the embedding generation
    generateEmbedding.mockResolvedValue([0.1, 0.2, 0.3]);

    // Mock the Pinecone query
    queryVectors.mockResolvedValue([
      { metadata: { text: "Quicksort is a divide-and-conquer algorithm." } },
    ]);

    // Mock the OpenAI response
    const mockOpenAIResponse = {
      data: {
        choices: [
          {
            message: {
              content: "Quicksort has an average time complexity of O(n log n).",
            },
          },
        ],
      },
    };
    OpenAIApi.prototype.createChatCompletion.mockResolvedValue(mockOpenAIResponse);

    const result = await generateEnhancedResponse(testQuery);
    expect(result).toHaveProperty('response');
    expect(result).toHaveProperty('context');
    expect(result.response).toBe("Quicksort has an average time complexity of O(n log n).");
    expect(result.context).toBe("Quicksort is a divide-and-conquer algorithm.");
  });
});
import { generateEmbedding, upsertText, querySimilarTexts } from '../embeddingService.js';
import { upsertVectors, queryVectors } from '../pineconeClient.js';

// Mock the Pinecone client functions
jest.mock('../pineconeClient.js', () => ({
  upsertVectors: jest.fn(),
  queryVectors: jest.fn(),
}));

describe('Embedding Service', () => {
  const testText = "What is the time complexity of quicksort?";

  it('should generate an embedding', async () => {
    const embedding = await generateEmbedding(testText);
    expect(embedding).toBeInstanceOf(Array);
    expect(embedding.length).toBeGreaterThan(0);
  });

  it('should upsert text and its embedding into Pinecone', async () => {
    await upsertText("test-id-1", testText, { type: "question" });
    expect(upsertVectors).toHaveBeenCalled();
  });

  it('should query similar texts from Pinecone', async () => {
    const similarTexts = await querySimilarTexts(testText);
    expect(queryVectors).toHaveBeenCalled();
    expect(similarTexts).toBeInstanceOf(Array);
  });
});
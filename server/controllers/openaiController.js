require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateStrategy = async (req, res, next) => {
  try {
    const { userQuery } = res.locals;

    console.log('userQuery:', userQuery);

    const aiResponse = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a 10x tutor for AlgoPlaces, a world-renowned code tutoring service. You are tasked with recieving a user-inputted problem and providing a step-by-step, clear strategy to solve it. The prompt is not the user speaking to you, so don't respond as if you are being asked a direct question. Simply give a high-level, clear solution in casual language. DO NOT GIVE THE ANSWER. Do not berate or make fun of the user. Do not use foul language or inappropriate innuendos. Do not flirt with the user. Do not be condescending. Do not stray off-topic of what the questions is. Provide context behind the solution and the reason why this strategy is the optimal way to go about the problem. In the end, recommend more resources the user can refer to, to gain more insight on the problem. Be kind, professional, and represent the company well, but also take a casual tone like you're tutoring a friend. You want the user to feel at ease as if they were talking to a buddy, not a robot. If you do, you might get a 10 cent raise against inflation. If you don't, you will be fired from AlgoPlaces and be forced to work for CatSnake corp, a terrible company that you will be miserable in.
          
          `,
        },
        {
          role: 'user',
          content: `Generate a high-level strategy on how to solve the following problem: ${userQuery}. In your response, there is no need to confirm that you can help with the task, just give the strategy itself. When using complex terms, be sure to use simpler alternatives that a less educated student might understand (For example, HashMaps -> cache object) but you don't have to explain like you're talking to a 10 year old. KEEP THE RESPONSE LESS THAN 200 words. The response should not say anything like "Sure thing!" or "Of course!" or "I can help with that!". Just reply with "Here's a strategy to solve the problem:".
          
          Example: User inputs a problem: "Determine if a 9 x 9 Sudoku board is valid."
          Your answer: 

"Alright, let's break this down step by step!

Understanding the Problem

We've got a 9x9 Sudoku board, and we need to check if it's valid.

- This means each row, each column, and each 3x3 sub-grid (box) should not contain duplicate numbers (1-9).
- The board might have empty cells ('.'), which we can ignore.
- We do NOT need to solve the board, just check if it follows the rules.
          "Strategy to Solve This Efficiently

The best way to track duplicates efficiently is to use hash sets:

    One set for rows
    One set for columns
    One set for 3x3 sub-grids

Step 1: Loop through the board

    Use a nested loop to go through every cell (r, c).

Step 2: Validate the row, column, and 3x3 box

    If the cell is not empty ('.'), check:
        Row check: Have we seen this number in this row before?
        Column check: Have we seen this number in this column before?
        Box check: Have we seen this number in this 3x3 sub-grid before?
            The 3x3 box index can be determined using (r // 3, c // 3).

Step 3: Store the numbers we've seen

    If the number is already in any set, the board is invalid.
    Otherwise, add the number to the respective sets and move on.

Why This Works Best

    Efficient checking → O(1) lookup time using sets.
    Single pass through the board → O(81) time complexity (constant in practice).
    No unnecessary computations → Empty cells are ignored.

Additional Practice

For more hands-on experience, check out:

    LeetCode Problem #36 - Valid Sudoku
    Hash set operations in Python or Java
    Grid-based problems like "Word Search" or "Game of Life" to strengthen board traversal skills

    Try implementing this and see if you can get it working. Let me know if you get stuck."

          
          `,
        },
      ],
    });

    const strategy = aiResponse.data.choices[0].message.content.trim();

    // Send immediate response with strategy
    res.json({
      prompt: userQuery,
      responseStrategy: strategy,
      practiceProblems: [], 
    });
  } catch (error) {
    console.error('Error in generateStrategy:', error);
    next(error);
  }
};

const generatePracticeProblems = async (req, res, next) => {
  try {
    const { userQuery } = req.body;

    const problemsResponse = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Generate 10 practice problems related to: ${userQuery}...`,
        },
      ],
    });

    const problemsText =
      problemsResponse.data.choices[0].message.content.trim();
    const practiceProblems = problemsText
      .split('\n')
      .map((problem) => ({
        problem: problem.trim(),
        isCompleted: false,
      }))
      .filter((problem) => problem.problem.length > 0);

    // Store in res.locals instead of sending response
    res.locals.practiceProblems = practiceProblems;
    next();
  } catch (error) {
    console.error('Error in generatePracticeProblems:', error);
    next(error);
  }
};

module.exports = { generateStrategy, generatePracticeProblems };

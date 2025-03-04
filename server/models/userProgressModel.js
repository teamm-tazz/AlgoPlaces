import mongoose from 'mongoose';

const practiceProblemSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const userProgressSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  responseStrategy: {
    type: String,
    required: true,
  },
  practiceProblems: [practiceProblemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  probability: {
    type: String,
    required: true
  }
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;

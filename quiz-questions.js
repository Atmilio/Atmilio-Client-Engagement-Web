(function () {
  const distractors = {
    'Why include human review in the cost estimate?': 'Human review always eliminates the need for other costs.',
    'Who is accountable for an AI-assisted business decision?': 'The model provider automatically assumes accountability.',
    'Why map the existing workflow first?': 'A workflow map guarantees that automation is safe and profitable.',
    'Why measure rework?': 'Rework has no effect on the time or cost of a process.',
    'Who approves a generated executive recommendation?': 'The AI model approves its own recommendation.',
    'What should you do when a hand history lacks stack sizes?': 'Invent the missing stack sizes to complete the analysis.',
    'Why specify the game version?': 'Game updates never affect strategy or mechanics.',
    'What should you verify before changing a build based on AI advice?': 'Only whether the advice sounds confident.',
    'Why are asking prices different from completed sales?': 'Asking prices prove what buyers actually paid.',
    'What should an AI do with an unknown purchase cost?': 'Estimate a purchase cost and present it as a fact.',
    'What must you do before sending an AI-drafted buyer message?': 'Send it immediately without checking its promises.',
    'What should you do when AI references a function that is not in the repository?': 'Assume the function exists and use it without checking.',
    'What happens if no owner was named?': 'Assign the task to a person chosen by the model.',
    'How should the model handle an absent milestone date?': 'Invent a likely date and present it as confirmed.',
    'Who approves a patient-facing clinical draft?': 'The AI model can approve its own clinical draft.',
    'What should happen before using an AI-generated business summary?': 'Use it immediately without checking the source.'
  };
  function build(question, answer) {
    if (typeof question !== 'string' || typeof answer !== 'string') throw new Error('Quiz question and answer are required.');
    if (/^(is|do|does|can|should|may)\b/i.test(question.trim())) {
      if (!/^no\b/i.test(answer.trim())) throw new Error(`Binary quiz requires an explicit answer: ${question}`);
      return { question, options: ['Yes', 'No'], correct: 1, explanation: answer };
    }
    if (!Object.hasOwn(distractors, question)) throw new Error(`No quiz alternative for: ${question}`);
    return { question, options: [distractors[question], answer], correct: 1, explanation: answer };
  }
  window.learningQuizQuestions = { build };
})();
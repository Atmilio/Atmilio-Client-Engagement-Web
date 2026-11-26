(function () {
  const results = new Map();
  function render(container, key, question, answer) {
    container.replaceChildren();
    let quiz;
    try { quiz = window.learningQuizQuestions.build(question, answer); }
    catch (error) {
      const notice = document.createElement('p');
      notice.textContent = 'This knowledge check is not available yet.';
      container.append(notice);
      return;
    }
    const form = document.createElement('form');
    form.className = 'lesson-quiz';
    const label = document.createElement('p'); label.className = 'quiz-label'; label.textContent = 'KNOWLEDGE CHECK';
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend'); legend.textContent = quiz.question;
    fieldset.append(legend);
    quiz.options.forEach((option, index) => {
      const choice = document.createElement('label'); choice.className = 'quiz-choice';
      const input = document.createElement('input'); input.type = 'radio'; input.name = 'quiz-answer'; input.value = String(index); input.required = true;
      const text = document.createElement('span'); text.textContent = option;
      choice.append(input, text); fieldset.append(choice);
    });
    const feedback = document.createElement('p'); feedback.className = 'quiz-feedback'; feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
    const submit = document.createElement('button'); submit.type = 'submit'; submit.className = 'button button-dark'; submit.textContent = 'Check answer';
    const note = document.createElement('p'); note.className = 'privacy-note'; note.textContent = 'Practice feedback is kept only while this page is open. Lesson completion is tracked separately.';
    const previous = results.get(key);
    if (previous?.correct) feedback.textContent = `Correct. ${quiz.explanation}`;
    form.addEventListener('submit', event => {
      event.preventDefault();
      const selected = form.querySelector('input[name="quiz-answer"]:checked');
      if (!selected) return;
      const correct = Number(selected.value) === quiz.correct;
      results.set(key, { correct });
      feedback.textContent = correct ? `Correct. ${quiz.explanation}` : 'Not quite. Review the lesson and try again.';
      feedback.className = `quiz-feedback ${correct ? 'correct' : 'incorrect'}`;
    });
    form.append(label, fieldset, submit, feedback, note);
    container.append(form);
  }
  window.lessonQuiz = { render };
})();
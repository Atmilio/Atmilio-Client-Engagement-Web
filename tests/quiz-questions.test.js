const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const context = vm.createContext({ window: {} });
for (const name of ['quiz-questions.js', 'role-courses.js', 'masterclass-content.js']) vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
const lessons = vm.runInContext('roleCourses.flatMap(course => course.lessons).concat(masterclass.flatMap(part => part.lessons || []))', context);
test('every available lesson has a usable quiz with distinct choices', () => {
  assert.ok(lessons.length > 0);
  for (const lesson of lessons) {
    const quiz = context.window.learningQuizQuestions.build(lesson.check || lesson.question, lesson.answer);
    assert.equal(quiz.options.length, 2);
    assert.notEqual(quiz.options[0], quiz.options[1]);
    assert.equal(quiz.correct, 1);
    assert.ok(quiz.explanation);
  }
});
test('unknown open-ended questions require an authored alternative', () => {
  assert.throws(() => context.window.learningQuizQuestions.build('What is this?', 'An answer.'), /No quiz alternative/);
});
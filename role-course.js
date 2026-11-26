const requestedTrack = new URLSearchParams(location.search).get('track');
const course = roleCourses.find(item => item.id === requestedTrack);
const lessonContainer = document.querySelector('#lesson');
const roadmap = document.querySelector('#roadmap');
let selectedLesson = 0;

function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}
function showLesson(index) {
  selectedLesson = index;
  const lesson = course.lessons[index];
  window.lessonAudio.show(`role-${course.id}-lesson-${index + 1}`, [lesson.title, 'Understand the workflow.', lesson.learn, 'Try a sample prompt.', lesson.prompt, 'Practice and review.', lesson.practice, 'Before you use AI.', course.boundary, 'Knowledge check.', lesson.check]);
  window.courseProgress.show(`role-${course.id}`, course.lessons.map((item, lessonIndex) => `lesson-${lessonIndex + 1}`), `lesson-${index + 1}`);
  roadmap.replaceChildren();
  course.lessons.forEach((item, lessonIndex) => {
    const button = element('button', `${String(lessonIndex + 1).padStart(2, '0')}  ${item.title}`, `roadmap-button${lessonIndex === index ? ' active' : ''}`);
    button.type = 'button';
    if (lessonIndex === index) button.setAttribute('aria-current', 'step');
    button.addEventListener('click', () => showLesson(lessonIndex));
    roadmap.append(button);
  });
  lessonContainer.replaceChildren();
  lessonContainer.append(element('p', `LESSON ${index + 1} OF ${course.lessons.length}`, 'eyebrow'));
  const heading = element('h2', lesson.title);
  heading.tabIndex = -1;
  lessonContainer.append(heading, element('h3', 'Understand the workflow'), element('p', lesson.learn));
  const practice = element('div', '', 'practice');
  practice.append(element('h3', 'Try a sample prompt'), element('p', lesson.prompt), element('h3', 'Practice and review'), element('p', lesson.practice));
  lessonContainer.append(practice);
  const knowledge = document.createElement('div');
  window.lessonQuiz.render(knowledge, `role-${course.id}-lesson-${index + 1}`, lesson.check, lesson.answer);
  lessonContainer.append(knowledge, element('h3', 'Before you use AI'), element('p', course.boundary));
  const controls = element('div', '', 'lesson-controls');
  const previous = element('button', '\u2190 Previous lesson');
  previous.type = 'button'; previous.disabled = index === 0;
  previous.addEventListener('click', () => { showLesson(index - 1); lessonContainer.scrollIntoView({ block: 'start' }); });
  const next = element('button', 'Next lesson \u2192');
  next.type = 'button'; next.disabled = index === course.lessons.length - 1;
  next.addEventListener('click', () => { showLesson(index + 1); lessonContainer.scrollIntoView({ block: 'start' }); });
  controls.append(previous, next); lessonContainer.append(controls);
  const references = element('div', '', 'sources');
  references.append(element('h3', 'Further reading'));
  const list = document.createElement('ul');
  course.sources.forEach(([label, url]) => {
    const listItem = document.createElement('li');
    const link = element('a', label); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    listItem.append(link); list.append(listItem);
  });
  references.append(list); lessonContainer.append(references);
}

if (course) {
  document.title = `${course.title} | Atmilio Learning`;
  document.querySelector('#course-audience').textContent = `PRACTICAL AI / ${course.audience.toUpperCase()}`;
  document.querySelector('#course-title').textContent = course.title;
  document.querySelector('#course-description').textContent = course.description;
  showLesson(selectedLesson);
} else {
  document.querySelector('#course-title').textContent = 'Course not found';
  document.querySelector('#course-description').textContent = 'Return to the course library to choose an available track.';
  document.querySelector('.learning-nav').hidden = true;
  lessonContainer.append(element('p', 'This course is not available.'));
}
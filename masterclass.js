const roadmap = document.querySelector('#roadmap');
const lessonContainer = document.querySelector('#lesson');
let selectedPart = 0;
let selectedLesson = 0;
let learner = null;
try { learner = JSON.parse(localStorage.getItem('atmilio-learning-profile-v1')); } catch (error) { learner = null; }
function safeText(value) {
  const element = document.createElement('span');
  element.textContent = typeof value === 'string' ? value : '';
  return element.innerHTML;
}
function workplaceExercise() {
  if (!learner || !(learner.scenario || learner.industry || learner.jobTitle || learner.organization || learner.tools)) return 'Consider a low-risk task in your own work or daily life. Use fictional information and define how you would verify the result.';
  const context = [learner.jobTitle, learner.industry, learner.organization ? `work involving ${learner.organization}` : '', learner.tools ? `tools such as ${learner.tools}` : '', learner.platform ? `platform: ${learner.platform}` : '', learner.audienceSize ? `audience: ${learner.audienceSize}` : '', learner.businessType, learner.hobby].filter(value => typeof value === 'string' && value.trim()).map(safeText).join(' / ');
  const investment = /investran/i.test(learner.tools || '') && /financ|investment|banking/i.test(learner.industry || '');
  let example = 'Choose a recurring task in this context. Using synthetic or approved material, ask an approved AI tool for a draft, then compare the result with your source and document the review steps.';
  if (investment) example = 'For an illustrative investment-operations scenario, use a synthetic fund report that might be exported from a system such as Investran. Ask an approved AI tool to identify missing fields and draft a reconciliation checklist; compare it with the original fictional report. Confirm your organization\'s approved export and integration capabilities before attempting this with real systems.';
  else if (learner.scenario === 'creator') {
    const creatorExamples = { analytics: 'Using fictional post metrics, ask AI to compare engagement across three posts, show its calculations, and suggest one test. Check the calculations and avoid treating correlation as proof of causation.', planning: 'Ask AI to propose three content ideas for your chosen platform and audience. Pick one and revise it to fit your own voice.', production: 'Use a fictional script to draft a platform-appropriate outline and two shorter variations. Review every claim, source, and usage right before publishing.', growth: 'Create a small experiment with two fictional post ideas. Define a metric, a comparison period, and what you would learn before making a decision.' };
    example = creatorExamples[learner.creatorNeed] || creatorExamples.planning;
  } else if (learner.scenario === 'small-business') {
    const businessExamples = { scheduling: 'Use fictional appointments and travel times to ask AI for a draft daily schedule. Check availability, travel, and customer commitments yourself.', estimates: 'Using fictional job measurements and material costs, draft an estimate checklist. Verify quantities, rates, tax, and final pricing independently.', customers: 'Draft a customer update for a fictional delayed appointment. Review the date, commitments, and tone before sending.', marketing: 'Draft a local-service post for a fictional job. Check that the services, claims, and photos are accurate and authorized.' };
    example = businessExamples[learner.businessNeed] || businessExamples.scheduling;
  } else if (learner.scenario === 'hobby') {
    const hobbyExamples = { organizing: 'Create a fictional collection inventory and ask AI to suggest fields for tracking items, condition, and provenance. Verify the resulting entries yourself.', research: 'Pick a fictional collectible and ask AI for research questions. Cross-check any facts against reputable primary sources.', grading: 'Use a fictional trading-card description to create a checklist of condition factors. AI cannot provide an authoritative grade or appraisal; consult the grading company\'s published standards and qualified experts.', other: 'Choose a fictional hobby project and ask AI for a planning checklist. Verify any factual or financial claims before acting.' };
    example = hobbyExamples[learner.hobbyNeed] || hobbyExamples.research;
  }
  return `${context ? `<span class="context-label">YOUR CONTEXT: ${context}</span><br>` : ''}${example}`;
}
function renderRoadmap() {
  roadmap.innerHTML = masterclass.map((part, index) => `<button type="button" class="roadmap-button${selectedPart === index ? ' active' : ''}" data-part="${index}" ${selectedPart === index ? 'aria-current="true"' : ''}><span>${String(index + 1).padStart(2, '0')}</span><span><strong>${part.title}</strong>${part.lessons ? 'Lessons available' : 'Outline'}</span></button>`).join('');
}
function renderLesson() {
  const part = masterclass[selectedPart];
  if (!part.lessons) {
    lessonContainer.innerHTML = `<p class="eyebrow">PART ${selectedPart + 1} / ROADMAP</p><h2>${part.title}</h2><p>This part is planned. Full lessons, exercises, and sources are still in development.</p><h3>Topics in this part</h3><ul class="topic-outline">${part.topics.map(topic => `<li>${topic}</li>`).join('')}</ul><div class="lesson-controls"><button type="button" data-part="0">Start Part 1 &rarr;</button></div>`;
    return;
  }
  const current = part.lessons[selectedLesson];
  lessonContainer.innerHTML = `<p class="eyebrow">PART 1 / LESSON ${selectedLesson + 1} OF ${part.lessons.length}</p><h2>${current.title}</h2><div class="lesson-tabs" aria-label="Part 1 lessons">${part.lessons.map((item, index) => `<button type="button" data-lesson="${index}" class="${selectedLesson === index ? 'active' : ''}" ${selectedLesson === index ? 'aria-current="step"' : ''}>${index + 1}. ${item.title}</button>`).join('')}</div>${current.sections.map(([heading, text]) => `<section><h3>${heading}</h3><p>${text}</p></section>`).join('')}<div class="practice"><h3>Put it into practice</h3><p>${current.exercise}</p><p>${workplaceExercise()}</p><p class="lesson-note">Examples are illustrative, not claims about a company's systems or approval policies. Never enter confidential information into an unapproved tool.</p></div><details><summary>Knowledge check: ${current.question}</summary><p>${current.answer}</p></details><div class="lesson-controls"><button type="button" data-lesson="${selectedLesson - 1}" ${selectedLesson === 0 ? 'disabled' : ''}>&larr; Previous lesson</button><button type="button" data-lesson="${selectedLesson + 1}" ${selectedLesson === part.lessons.length - 1 ? 'disabled' : ''}>Next lesson &rarr;</button></div><div class="sources"><h3>Further reading</h3><ul><li><a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">The Transformer: Attention Is All You Need</a></li><li><a href="https://platform.openai.com/tokenizer" target="_blank" rel="noopener noreferrer">Explore tokenization with the OpenAI tokenizer</a></li><li><a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener noreferrer">Model Context Protocol documentation</a></li><li><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer">NIST AI Risk Management Framework</a></li></ul></div>`;
}
document.addEventListener('click', event => {
  const partButton = event.target.closest('[data-part]');
  const lessonButton = event.target.closest('[data-lesson]');
  if (partButton) { selectedPart = Number(partButton.dataset.part); selectedLesson = 0; renderRoadmap(); renderLesson(); }
  if (lessonButton && !lessonButton.disabled) { selectedLesson = Number(lessonButton.dataset.lesson); renderLesson(); lessonContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
});
renderRoadmap();
renderLesson();
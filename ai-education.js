const courses = [
  { title: 'AI Mastery: Foundations to the Frontier', category: 'AI Fundamentals', description: 'A ten-part roadmap from AI foundations to agents, enterprise systems, safety, and AGI.', level: 'Beginner', tags: ['fundamentals', 'models', 'technical', 'business', 'beginner'], image: 'photo-1522202176988-66273c2fd55f', masterclass: true },
  { title: 'AI Foundations for Everyone', category: 'AI Fundamentals', description: 'Build a clear understanding of what AI can do and where to begin.', level: 'Beginner', tags: ['fundamentals', 'personal', 'beginner'], image: 'photo-1522202176988-66273c2fd55f' },
  { title: 'Generative AI at Work', category: 'AI for Business', description: 'Discover practical ways to bring generative AI into your daily work.', level: 'Beginner', tags: ['business', 'operations', 'productivity', 'beginner'], image: 'photo-1497366754035-f200968a6e72' },
  { title: 'Understanding AI Models', category: 'Models & Tools', description: 'Get to know language, image, and multimodal models and their uses.', level: 'Beginner', tags: ['models', 'technical', 'fundamentals', 'beginner'], image: 'photo-1519389950473-47ba0277781c' },
  { title: 'Prompting with Purpose', category: 'AI Fundamentals', description: 'Learn to ask better questions and get more useful results.', level: 'Beginner', tags: ['fundamentals', 'productivity', 'personal', 'beginner'], image: 'photo-1456324504439-367cee3b3c32' },
  { title: 'AI Strategy for Business Leaders', category: 'AI for Business', description: 'Identify opportunities and build a thoughtful AI adoption roadmap.', level: 'Intermediate', tags: ['business', 'strategy', 'intermediate'], image: 'photo-1552664730-d307ca884978' },
  { title: 'Automate Everyday Workflows', category: 'AI for Business', description: 'Explore how AI can support repeatable tasks and processes.', level: 'Intermediate', tags: ['operations', 'productivity', 'business', 'intermediate'], image: 'photo-1486406146926-c627a92ad1ab' },
  { title: 'AI for Marketing and Content', category: 'Creative & Content', description: 'Turn ideas into useful content with AI as a creative partner.', level: 'Beginner', tags: ['marketing', 'content', 'beginner'], image: 'photo-1553877522-43269d4ea984' },
  { title: 'AI for Creator Analytics', category: 'Creative & Content', description: 'Explore audience metrics, content experiments, and performance reporting.', level: 'Beginner', tags: ['creator', 'creator-analytics', 'data', 'content', 'beginner'], image: 'photo-1460925895917-afdab827c52f' },
  { title: 'AI for Creator Production', category: 'Creative & Content', description: 'Plan, produce, and repurpose content for your audience.', level: 'Beginner', tags: ['creator', 'creator-production', 'content', 'beginner'], image: 'photo-1524758631624-e2822e304c36' },
  { title: 'AI for Local Service Businesses', category: 'AI for Business', description: 'Explore scheduling, estimates, customer communication, and marketing for local services.', level: 'Beginner', tags: ['small-business', 'landscaping', 'business', 'operations', 'beginner'], image: 'photo-1556761175-b413da4baf72' },
  { title: 'AI for Collectors', category: 'AI Fundamentals', description: 'Organize a collection and research cards using verifiable sources.', level: 'Beginner', tags: ['hobby', 'cards', 'personal', 'beginner'], image: 'photo-1456324504439-367cee3b3c32' },
  { title: 'Working Smarter with Data', category: 'Data & Insights', description: 'Use AI to explore information, find patterns, and communicate insights.', level: 'Intermediate', tags: ['data', 'technical', 'business', 'intermediate'], image: 'photo-1460925895917-afdab827c52f' },
  { title: 'Choosing the Right AI Tool', category: 'Models & Tools', description: 'Compare tools and models based on the job you need them to do.', level: 'Beginner', tags: ['models', 'strategy', 'business', 'beginner'], image: 'photo-1516321318423-f06f85e504b3' },
  { title: 'Responsible AI in Practice', category: 'AI Fundamentals', description: 'Explore privacy, accuracy, and human oversight when using AI.', level: 'Beginner', tags: ['fundamentals', 'strategy', 'business', 'beginner'], image: 'photo-1521737711867-e3b97375f902' },
  { title: 'AI for Customer Experience', category: 'AI for Business', description: 'Find opportunities to improve customer communication and support.', level: 'Intermediate', tags: ['business', 'operations', 'productivity', 'intermediate'], image: 'photo-1556761175-b413da4baf72' },
  { title: 'Creative Workflows with AI', category: 'Creative & Content', description: 'Explore AI-assisted brainstorming, imagery, and creative production.', level: 'Intermediate', tags: ['marketing', 'content', 'models', 'intermediate'], image: 'photo-1524758631624-e2822e304c36' },
  { title: 'Building Your Own Language Model', category: 'Models & Tools', description: 'Explore the data, training, and evaluation behind language models.', level: 'Advanced', tags: ['build-llm', 'models', 'technical', 'advanced'], image: 'photo-1519389950473-47ba0277781c' },
  { title: 'Build Your First AI Agent', category: 'Models & Tools', description: 'Learn how agents use models, tools, and instructions to complete tasks.', level: 'Intermediate', tags: ['build-agent', 'models', 'technical', 'intermediate'], image: 'photo-1516321318423-f06f85e504b3' }
];
const categories = ['All topics', 'AI Fundamentals', 'AI for Business', 'Models & Tools', 'Creative & Content', 'Data & Insights'];
const filters = document.querySelector('#category-filters');
const grid = document.querySelector('#course-grid');
const search = document.querySelector('#search');
const dialog = document.querySelector('#course-dialog');
const intakeDialog = document.querySelector('#intake-dialog');
const intakeContent = document.querySelector('#intake-content');
const profileKey = 'atmilio-learning-profile-v1';
const goalOptions = {
  'build-llm': 'Build my own language model',
  'build-agent': 'Build my own AI agent',
  fundamentals: 'Learn more about AI',
  productivity: 'Use AI in everyday life',
  strategy: 'Develop an AI strategy',
  operations: 'Improve business workflows',
  content: 'Create marketing and content',
  data: 'Understand data and analytics'
};
const levelOptions = { beginner: 'Just getting started', intermediate: 'I know the basics', advanced: 'I use AI regularly' };
const scenarioLabels = { creator: 'Content creator', 'small-business': 'Small business owner', professional: 'Business professional', hobby: 'Hobby or recreation', general: 'Personal learning' };
const needLabels = { analytics: 'Analytics and performance', planning: 'Ideas and content planning', production: 'Creating and repurposing content', growth: 'Audience growth', scheduling: 'Scheduling and operations', estimates: 'Estimates and administrative work', customers: 'Customer communication', marketing: 'Marketing and finding customers', organizing: 'Organizing a collection', research: 'Research and learning', grading: 'Understanding grading', other: 'Other focus' };
let profile = null;
let draft = {};
let intakeStep = 'audience';
try { profile = JSON.parse(localStorage.getItem(profileKey)); } catch (error) { profile = null; }
if (!profile || !['business', 'individual'].includes(profile.audience) || !Object.hasOwn(goalOptions, profile.goal) || !Object.hasOwn(levelOptions, profile.level)) profile = null;
let activeCategory = 'All topics';
function courseScore(course, currentProfile) {
  if (!currentProfile) return 0;
  const relatedGoals = { 'build-llm': ['build-llm', 'models', 'technical'], 'build-agent': ['build-agent', 'models', 'technical'], fundamentals: ['fundamentals'], productivity: ['productivity', 'personal'], strategy: ['strategy', 'business'], operations: ['operations', 'productivity', 'business'], content: ['content', 'marketing'], data: ['data', 'technical'] };
  const context = [currentProfile.industry, currentProfile.jobTitle, currentProfile.organization, currentProfile.tools, currentProfile.businessType, currentProfile.hobby].filter(value => typeof value === 'string').join(' ').toLowerCase();
  let contextScore = 0;
  if (/financ|investment|banking|investran|analyst/.test(context) && course.tags.includes('data')) contextScore += 3;
  if (/marketing|creative|content/.test(context) && course.tags.includes('content')) contextScore += 3;
  if (/engineer|developer|software|technical/.test(context) && course.tags.includes('technical')) contextScore += 3;
  if (/operations|accounting|investran/.test(context) && course.tags.includes('operations')) contextScore += 3;
  if (currentProfile.scenario && course.tags.includes(currentProfile.scenario)) contextScore += 5;
  if (currentProfile.scenario === 'creator' && currentProfile.creatorNeed === 'analytics' && course.tags.includes('creator-analytics')) contextScore += 12;
  if (currentProfile.scenario === 'creator' && ['planning', 'production', 'growth'].includes(currentProfile.creatorNeed) && course.tags.includes('creator-production')) contextScore += 10;
  if (currentProfile.scenario === 'creator' && currentProfile.creatorNeed === 'analytics' && course.tags.includes('data')) contextScore += 4;
  if (currentProfile.scenario === 'creator' && ['10,001-100,000', 'Over 100,000'].includes(currentProfile.audienceSize) && course.tags.includes('creator-analytics')) contextScore += 2;
  if (currentProfile.scenario === 'creator' && /youtube|tiktok|instagram|video/i.test(currentProfile.platform || '') && course.tags.includes('creator-production')) contextScore += 2;
  if (currentProfile.scenario === 'small-business' && course.tags.includes('small-business')) contextScore += 8;
  if (currentProfile.scenario === 'small-business' && ['scheduling', 'estimates'].includes(currentProfile.businessNeed) && course.tags.includes('operations')) contextScore += 4;
  if (currentProfile.scenario === 'small-business' && currentProfile.businessNeed === 'marketing' && course.tags.includes('content')) contextScore += 5;
  if (currentProfile.scenario === 'small-business' && currentProfile.businessNeed === 'customers' && course.title === 'AI for Customer Experience') contextScore += 8;
  if (currentProfile.scenario === 'hobby' && course.tags.includes('hobby')) contextScore += 8;
  if (currentProfile.scenario === 'hobby' && /card|collect|grading/i.test(context) && course.tags.includes('cards')) contextScore += 4;
  return relatedGoals[currentProfile.goal].reduce((score, tag, index) => score + (course.tags.includes(tag) ? (index === 0 ? 8 : 2) : 0), 0) + (course.tags.includes(currentProfile.level) ? 1 : 0) + (currentProfile.audience === 'business' && course.tags.includes('business') ? 1 : 0) + contextScore;
}
function renderFilters() {
  filters.innerHTML = categories.map(category => `<button type="button" class="filter${category === activeCategory ? ' active' : ''}" aria-pressed="${category === activeCategory}" data-category="${category}">${category}</button>`).join('');
}
function renderCourses() {
  const query = search.value.trim().toLowerCase();
  const visible = courses.filter(course => (activeCategory === 'All topics' || course.category === activeCategory) && `${course.title} ${course.category} ${course.description}`.toLowerCase().includes(query)).sort((first, second) => courseScore(second, profile) - courseScore(first, profile));
  document.querySelector('#results-count').textContent = `${visible.length} ${visible.length === 1 ? 'TOPIC' : 'TOPICS'}`;
  document.querySelector('#empty-state').hidden = visible.length > 0;
  grid.innerHTML = visible.map(course => `<article class="course-card"><div class="course-image" style="background-image:url('https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=700&q=80')"><span class="course-number">${String(courses.indexOf(course) + 1).padStart(2, '0')} / ${course.level.toUpperCase()}</span></div><div class="course-body"><div class="course-category">${course.category}</div><h3>${course.title}</h3><p>${course.description}</p><div class="course-footer"><span>${course.masterclass ? 'Part 1 available' : 'In development'}</span><button type="button" data-course="${courses.indexOf(course)}">${course.masterclass ? 'Explore masterclass' : 'View topic'} &rarr;</button></div></div></article>`).join('');
}
function showCourse(index) {
  const course = courses[index];
  if (!course) return;
  if (course.masterclass) { window.location.href = 'masterclass.html'; return; }
  document.querySelector('#dialog-content').innerHTML = `<span class="course-category">${course.category} / ${course.level}</span><h2 id="dialog-title">${course.title}</h2><p>${course.description}</p><span class="dialog-status">COURSE IN DEVELOPMENT</span><p>Course content, pricing, enrollment, and ${profile && profile.package === 'team' ? 'team packages' : 'purchasing'} are not available yet.</p><div class="dialog-action"><a class="button" href="#survey">View your learning profile &rarr;</a></div>`;
  dialog.showModal();
}
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderCourses();
});
search.addEventListener('input', renderCourses);
document.addEventListener('click', event => {
  const courseButton = event.target.closest('[data-course]');
  if (courseButton) showCourse(Number(courseButton.dataset.course));
  const categoryLink = event.target.closest('[data-category-link]');
  if (categoryLink) {
    activeCategory = categoryLink.dataset.categoryLink;
    search.value = '';
    renderFilters();
    renderCourses();
  }
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog || event.target.closest('a')) dialog.close();
});
function updateProfile() {
  const results = document.querySelector('#recommendations');
  const title = document.querySelector('#profile-title');
  const summary = document.querySelector('#profile-summary');
  const edit = document.querySelector('#edit-profile');
  document.querySelector('#clear-profile').hidden = !profile;
  if (!profile) {
    title.textContent = 'Find your starting point.';
    summary.textContent = 'Create a learning profile to see topics matched to your goals.';
    edit.innerHTML = 'Create my profile <span aria-hidden="true">&rarr;</span>';
    document.querySelector('#catalog-intro').textContent = "Explore the course topics we're developing for curious minds and ambitious teams.";
    results.hidden = true;
    renderCourses();
    return;
  }
  title.textContent = profile.name ? `${profile.name}'s learning profile` : 'Your learning profile';
  const audience = profile.audience === 'business' ? (profile.package === 'team' ? 'Business / multi-user package' : 'Business / one learner') : 'Individual learner';
  const selectedNeed = profile.scenario === 'creator' ? profile.creatorNeed : profile.scenario === 'small-business' ? profile.businessNeed : profile.scenario === 'hobby' ? profile.hobbyNeed : '';
  summary.textContent = [audience, scenarioLabels[profile.scenario], goalOptions[profile.goal], levelOptions[profile.level], needLabels[selectedNeed], profile.industry, profile.jobTitle, profile.organization, profile.tools, profile.platform, profile.audienceSize, profile.businessType, profile.hobby].filter(value => typeof value === 'string' && value.trim()).join(' | ');
  edit.innerHTML = 'Update my profile <span aria-hidden="true">&rarr;</span>';
  document.querySelector('#catalog-intro').textContent = `Topics are ordered for your goal: ${goalOptions[profile.goal].toLowerCase()}.`;
  const ranked = courses.map((course, index) => ({ course, index, score: courseScore(course, profile) })).sort((first, second) => second.score - first.score || first.index - second.index).slice(0, 3);
  results.innerHTML = `<h3>Your suggested starting points</h3><p>Based on your goals, experience, and workplace context. Some topics are in development.</p>${ranked.map(({ course, index }) => `<button type="button" data-course="${index}">${course.title}<span aria-hidden="true">&rarr;</span></button>`).join('')}`;
  results.hidden = false;
  renderCourses();
}
function renderIntake() {
  const options = intakeStep === 'audience' ? [['individual', 'An individual', 'Learning for myself'], ['business', 'A business', 'Learning for someone at my company']] : intakeStep === 'package' ? [['single', 'One learner', 'A specific individual at my company'], ['team', 'A team or company', 'A multi-user company package']] : intakeStep === 'scenario' ? (draft.audience === 'business' ? [['small-business', 'Small business owner', 'Local services, shops, and independent businesses'], ['professional', 'Business professional', 'A role at an organization'], ['creator', 'Content creator', 'A creator or media business'], ['general', 'Something else', 'Explore AI for another purpose']] : [['creator', 'Content creator', 'Videos, writing, social media, or other content'], ['small-business', 'Small business owner', 'Including local service businesses'], ['professional', 'Business professional', 'Use AI in my role'], ['hobby', 'Hobby or recreation', 'Collections, interests, and everyday projects'], ['general', 'Something else', 'Explore AI at my own pace']]) : intakeStep === 'goal' ? (draft.audience === 'individual' ? [['build-llm', goalOptions['build-llm'], 'Understand how language models are made'], ['build-agent', goalOptions['build-agent'], 'Create AI that can take action'], ['fundamentals', goalOptions.fundamentals, 'Build a clear foundation'], ['productivity', goalOptions.productivity, 'Make everyday tasks easier'], ['content', goalOptions.content, 'Make content and develop ideas'], ['data', goalOptions.data, 'Understand data and analytics']] : [['strategy', goalOptions.strategy, 'Plan AI adoption for your business'], ['operations', goalOptions.operations, 'Improve how work gets done'], ['content', goalOptions.content, 'Support creative and marketing work'], ['data', goalOptions.data, 'Understand business data'], ['fundamentals', goalOptions.fundamentals, 'Start with the essentials'], ['build-agent', goalOptions['build-agent'], 'Create AI that can take action']]) : intakeStep === 'level' ? Object.entries(levelOptions).map(([value, label]) => [value, label, '']) : [];
  const headings = { audience: ['WELCOME TO ATMILIO LEARNING', 'Who are you learning for?', 'Choose the path that fits you best.'], package: ['YOUR BUSINESS', 'Who needs access?', 'We will tailor your learning path to your purchase interest.'], scenario: ['YOUR WORLD', 'What best describes you?', 'Choose the closest fit. You can update it later.'], goal: ['YOUR GOAL', 'What would you like to do with AI?', 'Choose the goal that matters most right now.'], level: ['YOUR EXPERIENCE', 'Where are you starting?', 'We will use this to help prioritize your topics.'], name: ['YOUR PROFILE', 'Make it yours.', 'All fields are optional. Avoid confidential details; these answers stay on this device.'] };
  const [eyebrow, heading, description] = headings[intakeStep];
  const back = intakeStep !== 'audience' ? '<button type="button" class="intake-back" data-intake-back>&larr; Back</button>' : '';
  const extraFields = draft.scenario === 'creator' ? '<label for="profile-platform">Primary platform <span>(optional)</span></label><input id="profile-platform" name="platform" maxlength="80" placeholder="e.g. YouTube, TikTok, newsletter"><label for="profile-audience">Audience size <span>(optional)</span></label><select id="profile-audience" name="audienceSize"><option value="">Prefer not to say</option><option>Just starting</option><option>Under 1,000</option><option>1,000-10,000</option><option>10,001-100,000</option><option>Over 100,000</option></select><label for="creator-need">What would you most like help with? <span>(optional)</span></label><select id="creator-need" name="creatorNeed"><option value="">Choose a focus</option><option value="analytics">Analytics and performance</option><option value="planning">Ideas and content planning</option><option value="production">Creating and repurposing content</option><option value="growth">Audience growth</option><option value="other">Something else</option></select>' : draft.scenario === 'small-business' ? '<label for="business-type">What kind of business? <span>(optional)</span></label><input id="business-type" name="businessType" maxlength="80" placeholder="e.g. Landscaping"><label for="business-need">What would you most like help with? <span>(optional)</span></label><select id="business-need" name="businessNeed"><option value="">Choose a focus</option><option value="scheduling">Scheduling and operations</option><option value="estimates">Estimates and administrative work</option><option value="customers">Customer communication</option><option value="marketing">Marketing and finding customers</option><option value="other">Something else</option></select>' : draft.scenario === 'hobby' ? '<label for="profile-hobby">What are you interested in? <span>(optional)</span></label><input id="profile-hobby" name="hobby" maxlength="100" placeholder="e.g. Trading cards and grading"><label for="hobby-need">What would you most like help with? <span>(optional)</span></label><select id="hobby-need" name="hobbyNeed"><option value="">Choose a focus</option><option value="organizing">Organizing a collection</option><option value="research">Research and learning</option><option value="grading">Understanding grading</option><option value="other">Something else</option></select>' : '';
  intakeContent.innerHTML = `${back}<p class="eyebrow">${eyebrow}</p><h2 id="intake-title" tabindex="-1">${heading}</h2><p class="intake-description">${description}</p>${intakeStep === 'name' ? `<form id="intake-name-form">${extraFields}<label for="profile-name">Name <span>(optional)</span></label><input id="profile-name" name="name" maxlength="60" autocomplete="given-name" placeholder="Your name"><label for="profile-industry">Industry <span>(optional)</span></label><input id="profile-industry" name="industry" maxlength="80" placeholder="e.g. Financial services"><label for="profile-job">Job title <span>(optional)</span></label><input id="profile-job" name="jobTitle" maxlength="80" placeholder="e.g. Investment analyst"><label for="profile-org">Relevant company or organization <span>(optional)</span></label><input id="profile-org" name="organization" maxlength="80" placeholder="e.g. a company you work with"><label for="profile-tools">Relevant tools or platforms <span>(optional)</span></label><input id="profile-tools" name="tools" maxlength="120" placeholder="e.g. Investran"><button class="button button-dark" type="submit">See my learning path <span aria-hidden="true">&rarr;</span></button></form>` : `<div class="intake-options">${options.map(([value, label, detail]) => `<button type="button" data-intake-choice="${value}"><span><strong>${label}</strong>${detail ? `<small>${detail}</small>` : ''}</span><span aria-hidden="true">&rarr;</span></button>`).join('')}</div>`}`;
  if (intakeStep === 'name') document.querySelectorAll('#intake-name-form input, #intake-name-form select').forEach(field => { field.value = typeof draft[field.name] === 'string' ? draft[field.name] : ''; });
  document.querySelector('#intake-title').focus();
}
function openIntake() {
  draft = profile ? { ...profile } : {};
  intakeStep = 'audience';
  renderIntake();
  intakeDialog.showModal();
  document.querySelector('#intake-title').focus();
}
intakeContent.addEventListener('click', event => {
  const choice = event.target.closest('[data-intake-choice]');
  if (choice) {
    const value = choice.dataset.intakeChoice;
    if (intakeStep === 'audience') { draft.audience = value; delete draft.package; delete draft.goal; intakeStep = value === 'business' ? 'package' : 'scenario'; }
    else if (intakeStep === 'package') { draft.package = value; intakeStep = 'scenario'; }
    else if (intakeStep === 'scenario') { draft.scenario = value; intakeStep = 'goal'; }
    else if (intakeStep === 'goal') { draft.goal = value; intakeStep = 'level'; }
    else if (intakeStep === 'level') { draft.level = value; intakeStep = 'name'; }
    renderIntake();
  } else if (event.target.closest('[data-intake-back]')) {
    if (intakeStep === 'name') document.querySelectorAll('#intake-name-form input, #intake-name-form select').forEach(field => { draft[field.name] = field.value; });
    intakeStep = intakeStep === 'name' ? 'level' : intakeStep === 'level' ? 'goal' : intakeStep === 'goal' ? 'scenario' : intakeStep === 'scenario' && draft.audience === 'business' ? 'package' : 'audience';
    renderIntake();
  }
});
intakeContent.addEventListener('submit', event => {
  event.preventDefault();
  ['platform', 'audienceSize', 'creatorNeed', 'businessType', 'businessNeed', 'hobby', 'hobbyNeed'].forEach(field => { delete draft[field]; });
  document.querySelectorAll('#intake-name-form input, #intake-name-form select').forEach(field => { draft[field.name] = field.value.trim(); });
  profile = { ...draft };
  try { localStorage.setItem(profileKey, JSON.stringify(profile)); document.querySelector('#profile-storage').textContent = 'Your profile is saved only in this browser, not in an account.'; }
  catch (error) { document.querySelector('#profile-storage').textContent = 'Browser storage is unavailable. Your profile will last only until you leave this page.'; }
  intakeDialog.close();
  activeCategory = 'All topics';
  search.value = '';
  renderFilters();
  updateProfile();
  document.querySelector('#survey').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('#skip-intake').addEventListener('click', () => intakeDialog.close());
document.querySelector('#edit-profile').addEventListener('click', openIntake);
document.querySelector('#clear-profile').addEventListener('click', () => {
  profile = null;
  try { localStorage.removeItem(profileKey); } catch (error) { document.querySelector('#profile-storage').textContent = 'Browser storage is unavailable.'; }
  updateProfile();
});
renderFilters();
updateProfile();
if (!profile) openIntake();
if (window.lucide) window.lucide.createIcons();
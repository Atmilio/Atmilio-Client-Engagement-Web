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
courses.push(...roleCourses.map(course => ({ ...course, level: 'Beginner', roleCourse: true })));
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
let accountState = { status: 'loading', profile: null, email: null };
let intakeOwner = null;
let initialAccountState = true;
function validProfile(value) {
  return value && ['business', 'individual'].includes(value.audience) && Object.hasOwn(goalOptions, value.goal) && Object.hasOwn(levelOptions, value.level) ? value : null;
}
function guestProfile() {
  try { return validProfile(JSON.parse(localStorage.getItem(profileKey))); } catch (error) { return null; }
}
let activeCategory = 'All topics';
function roleFocus(currentProfile) {
  if (!currentProfile) return null;
  if (roleCourses.some(item => item.id === currentProfile.roleTrack)) return currentProfile.roleTrack;
  if (['ceo', 'coo', 'cto', 'chro'].includes(currentProfile.executiveRole)) return currentProfile.executiveRole;
  const context = [currentProfile.industry, currentProfile.jobTitle, currentProfile.organization, currentProfile.tools, currentProfile.businessType, currentProfile.hobby].filter(value => typeof value === 'string').join(' ');
  const inferred = roleCourses.find(item => item.match.test(context));
  if (inferred) return inferred.id;
  const levelTracks = { 'Individual contributor': 'corporate-individual', 'Team lead': 'corporate-manager', Manager: 'corporate-manager', Director: 'corporate-director', 'Vice president': 'corporate-director' };
  return levelTracks[currentProfile.organizationalLevel] || null;
}
function departmentCourses(currentProfile) {
  if (!currentProfile || !['professional', 'small-business'].includes(currentProfile.scenario)) return [];
  const departmentTracks = {
    'Finance and accounting': ['finance-accounting'],
    'Marketing and communications': ['marketing-team'],
    'Sales and customer service': ['sales-team', 'customer-support'],
    'Product and design': ['product-team'],
    'Technology and engineering': ['developers'],
    'Human resources': ['hr'],
    'Legal and compliance': ['lawyers']
  };
  return departmentTracks[currentProfile.department] || [];
}
function courseScore(course, currentProfile) {
  if (!currentProfile) return 0;
  const relatedGoals = { 'build-llm': ['build-llm', 'models', 'technical'], 'build-agent': ['build-agent', 'models', 'technical'], fundamentals: ['fundamentals'], productivity: ['productivity', 'personal'], strategy: ['strategy', 'business'], operations: ['operations', 'productivity', 'business'], content: ['content', 'marketing'], data: ['data', 'technical'] };
  const context = [currentProfile.industry, currentProfile.jobTitle, currentProfile.organization, currentProfile.tools, currentProfile.businessType, currentProfile.hobby].filter(value => typeof value === 'string').join(' ').toLowerCase();
  const focus = roleFocus(currentProfile);
  let contextScore = 0;
  if (course.roleCourse && course.id === focus) contextScore += 100;
  if (course.roleCourse && departmentCourses(currentProfile).includes(course.id)) contextScore += 35;
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
function personalizedCourses(currentProfile) {
  if (!currentProfile) return [];
  const focus = roleFocus(currentProfile);
  return courses.filter(course => {
    if (course.roleCourse) return course.id === focus || departmentCourses(currentProfile).includes(course.id);
    const incidentalScore = (course.tags.includes(currentProfile.level) ? 1 : 0) + (currentProfile.audience === 'business' && course.tags.includes('business') ? 1 : 0);
    return courseScore(course, currentProfile) > incidentalScore;
  }).sort((first, second) => courseScore(second, currentProfile) - courseScore(first, currentProfile)).slice(0, 6);
}
function renderFilters() {
  filters.innerHTML = categories.map(category => `<button type="button" class="filter${category === activeCategory ? ' active' : ''}" aria-pressed="${category === activeCategory}" data-category="${category}">${category}</button>`).join('');
}
function renderCourses() {
  const query = search.value.trim().toLowerCase();
  const pool = query ? courses : personalizedCourses(profile);
  const visible = pool.filter(course => (activeCategory === 'All topics' || course.category === activeCategory) && (!query || `${course.title} ${course.category} ${course.description} ${course.audience || ''} ${course.tags.join(' ')}`.toLowerCase().includes(query))).sort((first, second) => courseScore(second, profile) - courseScore(first, profile));
  document.querySelector('#results-count').textContent = `${visible.length} ${visible.length === 1 ? 'TOPIC' : 'TOPICS'}`;
  document.querySelector('#catalog-scope').textContent = query ? 'SEARCHING THE FULL LIBRARY' : profile ? 'SELECTED FOR YOUR PROFILE' : 'CREATE A PROFILE OR SEARCH';
  const emptyState = document.querySelector('#empty-state');
  emptyState.hidden = visible.length > 0;
  emptyState.textContent = query ? 'No topics match your search. Try another keyword or category.' : profile ? 'No recommended topics match this category. Try another category or search the full library.' : 'Create your learning profile for recommendations, or search for a course.';
  grid.innerHTML = visible.map(course => `<article class="course-card"><div class="course-image" style="background-image:url('https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=700&q=80')"><span class="course-number">${String(courses.indexOf(course) + 1).padStart(2, '0')} / ${course.level.toUpperCase()}</span></div><div class="course-body"><div class="course-category">${course.category}</div><h3>${course.title}</h3><p>${course.description}</p><div class="course-footer"><span>${course.masterclass ? 'Part 1 available' : course.roleCourse ? '3 lessons available' : 'In development'}</span><button type="button" data-course="${courses.indexOf(course)}">${course.masterclass ? 'Explore masterclass' : course.roleCourse ? 'Start course' : 'View topic'} &rarr;</button></div></div></article>`).join('');
}
function showCourse(index) {
  const course = courses[index];
  if (!course) return;
  if (course.masterclass) { window.location.href = 'masterclass.html'; return; }
  if (course.roleCourse) { window.location.href = `role-course.html?track=${encodeURIComponent(course.id)}`; return; }
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
search.addEventListener('input', () => {
  activeCategory = 'All topics';
  renderFilters();
  renderCourses();
});
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
    document.querySelector('#catalog-intro').textContent = 'Create a profile for personalized topics, or search the full library.';
    results.hidden = true;
    renderCourses();
    return;
  }
  title.textContent = profile.name ? `${profile.name}'s learning profile` : 'Your learning profile';
  const audience = profile.audience === 'business' ? (profile.package === 'team' ? 'Business / multi-user package' : 'Business / one learner') : 'Individual learner';
  const selectedNeed = profile.scenario === 'creator' ? profile.creatorNeed : profile.scenario === 'small-business' ? profile.businessNeed : profile.scenario === 'hobby' ? profile.hobbyNeed : '';
  const selectedCourse = roleCourses.find(course => course.id === roleFocus(profile));
  summary.textContent = [audience, scenarioLabels[profile.scenario], selectedCourse && selectedCourse.audience, goalOptions[profile.goal], levelOptions[profile.level], needLabels[selectedNeed], profile.organizationType, profile.organizationSize, profile.organizationalLevel, profile.department, profile.industry, profile.jobTitle, profile.organization, profile.tools, profile.platform, profile.audienceSize, profile.businessType, profile.hobby].filter(value => typeof value === 'string' && value.trim()).join(' | ');
  edit.innerHTML = 'Update my profile <span aria-hidden="true">&rarr;</span>';
  document.querySelector('#catalog-intro').textContent = `Topics selected for your goal: ${goalOptions[profile.goal].toLowerCase()}.`;
  const ranked = personalizedCourses(profile).slice(0, 3).map(course => ({ course, index: courses.indexOf(course) }));
  results.innerHTML = `<h3>Your suggested starting points</h3><p>Based on your goals, experience, and workplace context. Some topics are in development.</p>${ranked.map(({ course, index }) => `<button type="button" data-course="${index}">${course.title}<span aria-hidden="true">&rarr;</span></button>`).join('')}`;
  results.hidden = false;
  renderCourses();
}
function renderIntake() {
  const options = intakeStep === 'audience' ? [['individual', 'An individual', 'Learning for myself'], ['business', 'A business', 'Learning for someone at my company']] : intakeStep === 'package' ? [['single', 'One learner', 'A specific individual at my company'], ['team', 'A team or company', 'A multi-user company package']] : intakeStep === 'scenario' ? (draft.audience === 'business' ? [['small-business', 'Small business owner', 'Local services, shops, and independent businesses'], ['professional', 'Business professional', 'A role at an organization'], ['creator', 'Content creator', 'A creator or media business'], ['general', 'Something else', 'Explore AI for another purpose']] : [['creator', 'Content creator', 'Videos, writing, social media, or other content'], ['small-business', 'Small business owner', 'Including local service businesses'], ['professional', 'Business professional', 'Use AI in my role'], ['hobby', 'Hobby or recreation', 'Collections, interests, and everyday projects'], ['general', 'Something else', 'Explore AI at my own pace']]) : intakeStep === 'goal' ? (draft.audience === 'individual' ? [['build-llm', goalOptions['build-llm'], 'Understand how language models are made'], ['build-agent', goalOptions['build-agent'], 'Create AI that can take action'], ['fundamentals', goalOptions.fundamentals, 'Build a clear foundation'], ['productivity', goalOptions.productivity, 'Make everyday tasks easier'], ['content', goalOptions.content, 'Make content and develop ideas'], ['data', goalOptions.data, 'Understand data and analytics']] : [['strategy', goalOptions.strategy, 'Plan AI adoption for your business'], ['operations', goalOptions.operations, 'Improve how work gets done'], ['content', goalOptions.content, 'Support creative and marketing work'], ['data', goalOptions.data, 'Understand business data'], ['fundamentals', goalOptions.fundamentals, 'Start with the essentials'], ['build-agent', goalOptions['build-agent'], 'Create AI that can take action']]) : intakeStep === 'level' ? Object.entries(levelOptions).map(([value, label]) => [value, label, '']) : [];
  const headings = { audience: ['WELCOME TO ATMILIO LEARNING', 'Who are you learning for?', 'Choose the path that fits you best.'], package: ['YOUR BUSINESS', 'Who needs access?', 'We will tailor your learning path to your purchase interest.'], scenario: ['YOUR WORLD', 'What best describes you?', 'Choose the closest fit. You can update it later.'], organization: ['YOUR ORGANIZATION', 'Tell us about your role.', 'These details are optional and help us suggest relevant learning.'], goal: ['YOUR GOAL', 'What would you like to do with AI?', 'Choose the goal that matters most right now.'], level: ['YOUR EXPERIENCE', 'Where are you starting?', 'We will use this to help prioritize your topics.'], name: ['YOUR PROFILE', 'Make it yours.', 'All fields are optional. Avoid confidential details; your storage choice is shown below.'] };
  const [eyebrow, heading, description] = headings[intakeStep];
  const back = intakeStep !== 'audience' ? '<button type="button" class="intake-back" data-intake-back>&larr; Back</button>' : '';
  const extraFields = draft.scenario === 'creator' ? '<label for="profile-platform">Primary platform <span>(optional)</span></label><input id="profile-platform" name="platform" maxlength="80" placeholder="e.g. YouTube, TikTok, newsletter"><label for="profile-audience">Audience size <span>(optional)</span></label><select id="profile-audience" name="audienceSize"><option value="">Prefer not to say</option><option>Just starting</option><option>Under 1,000</option><option>1,000-10,000</option><option>10,001-100,000</option><option>Over 100,000</option></select><label for="creator-need">What would you most like help with? <span>(optional)</span></label><select id="creator-need" name="creatorNeed"><option value="">Choose a focus</option><option value="analytics">Analytics and performance</option><option value="planning">Ideas and content planning</option><option value="production">Creating and repurposing content</option><option value="growth">Audience growth</option><option value="other">Something else</option></select>' : draft.scenario === 'small-business' ? '<label for="business-type">What kind of business? <span>(optional)</span></label><input id="business-type" name="businessType" maxlength="80" placeholder="e.g. Landscaping"><label for="business-need">What would you most like help with? <span>(optional)</span></label><select id="business-need" name="businessNeed"><option value="">Choose a focus</option><option value="scheduling">Scheduling and operations</option><option value="estimates">Estimates and administrative work</option><option value="customers">Customer communication</option><option value="marketing">Marketing and finding customers</option><option value="other">Something else</option></select>' : draft.scenario === 'hobby' ? '<label for="profile-hobby">What are you interested in? <span>(optional)</span></label><input id="profile-hobby" name="hobby" maxlength="100" placeholder="e.g. Trading cards and grading"><label for="hobby-need">What would you most like help with? <span>(optional)</span></label><select id="hobby-need" name="hobbyNeed"><option value="">Choose a focus</option><option value="organizing">Organizing a collection</option><option value="research">Research and learning</option><option value="grading">Understanding grading</option><option value="other">Something else</option></select>' : '';
  const roleOptions = roleCourses.map(course => `<option value="${course.id}">${course.audience}</option>`).join('');
  const organizationFields = '<form id="intake-org-form"><label for="org-type">Organization type <span>(optional)</span></label><select id="org-type" name="organizationType"><option value="">Select type</option><option>Small business</option><option>Startup</option><option>Private company</option><option>Public company</option><option>Nonprofit</option><option>Government or public sector</option><option>Other organization</option></select><label for="org-size">Organization size <span>(optional)</span></label><select id="org-size" name="organizationSize"><option value="">Select size</option><option>Self-employed</option><option>2-10 people</option><option>11-50 people</option><option>51-200 people</option><option>201-1,000 people</option><option>Over 1,000 people</option></select><label for="org-level">Your level <span>(optional)</span></label><select id="org-level" name="organizationalLevel"><option value="">Select level</option><option>Individual contributor</option><option>Team lead</option><option>Manager</option><option>Director</option><option>Vice president</option><option>Executive or founder</option><option>Owner</option><option>Other</option></select><label for="org-department">Function <span>(optional)</span></label><select id="org-department" name="department"><option value="">Select function</option><option>Executive leadership</option><option>Operations</option><option>Technology and engineering</option><option>Human resources</option><option>Finance and accounting</option><option>Marketing and communications</option><option>Sales and customer service</option><option>Legal and compliance</option><option>Product and design</option><option>Other function</option></select><label for="executive-role">Executive role <span>(optional)</span></label><select id="executive-role" name="executiveRole"><option value="">None or other</option><option value="ceo">CEO / chief executive</option><option value="coo">COO / chief operating officer</option><option value="cto">CTO / chief technology officer</option><option value="chro">CHRO / chief human resources officer</option></select><button class="button button-dark" type="submit">Continue <span aria-hidden="true">&rarr;</span></button></form>';
  intakeContent.innerHTML = `${back}<p class="eyebrow">${eyebrow}</p><h2 id="intake-title" tabindex="-1">${heading}</h2><p class="intake-description">${description}</p>${intakeStep === 'organization' ? organizationFields : intakeStep === 'name' ? `<form id="intake-name-form">${extraFields}<label for="profile-role-track">Specific course focus <span>(optional; overrides executive role)</span></label><select id="profile-role-track" name="roleTrack"><option value="">No specific focus</option>${roleOptions}</select><label for="profile-name">Name <span>(optional)</span></label><input id="profile-name" name="name" maxlength="60" autocomplete="given-name" placeholder="Your name"><label for="profile-industry">Industry <span>(optional)</span></label><input id="profile-industry" name="industry" maxlength="80" placeholder="e.g. Financial services"><label for="profile-job">Job title <span>(optional)</span></label><input id="profile-job" name="jobTitle" maxlength="80" placeholder="e.g. Investment analyst"><label for="profile-org">Relevant company or organization <span>(optional)</span></label><input id="profile-org" name="organization" maxlength="80" placeholder="e.g. a company you work with"><label for="profile-tools">Relevant tools or platforms <span>(optional)</span></label><input id="profile-tools" name="tools" maxlength="120" placeholder="e.g. Investran"><button class="button button-dark" type="submit">See my learning path <span aria-hidden="true">&rarr;</span></button></form>` : `<div class="intake-options">${options.map(([value, label, detail]) => `<button type="button" data-intake-choice="${value}"><span><strong>${label}</strong>${detail ? `<small>${detail}</small>` : ''}</span><span aria-hidden="true">&rarr;</span></button>`).join('')}</div>`}`;
  if (intakeStep === 'name' || intakeStep === 'organization') intakeContent.querySelectorAll('input, select').forEach(field => { field.value = typeof draft[field.name] === 'string' ? draft[field.name] : ''; });
  document.querySelector('#intake-title').focus();
}
function openIntake() {
  if (!['guest', 'ready'].includes(accountState.status)) return;
  intakeOwner = accountState.status === 'ready' ? accountState.email : 'guest';
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
    else if (intakeStep === 'scenario') { draft.scenario = value; intakeStep = ['professional', 'small-business'].includes(value) ? 'organization' : 'goal'; }
    else if (intakeStep === 'goal') { draft.goal = value; intakeStep = 'level'; }
    else if (intakeStep === 'level') { draft.level = value; intakeStep = 'name'; }
    renderIntake();
  } else if (event.target.closest('[data-intake-back]')) {
    if (intakeStep === 'name') document.querySelectorAll('#intake-name-form input, #intake-name-form select').forEach(field => { draft[field.name] = field.value; });
    if (intakeStep === 'organization') document.querySelectorAll('#intake-org-form select').forEach(field => { draft[field.name] = field.value; });
    intakeStep = intakeStep === 'name' ? 'level' : intakeStep === 'level' ? 'goal' : intakeStep === 'goal' ? (['professional', 'small-business'].includes(draft.scenario) ? 'organization' : 'scenario') : intakeStep === 'organization' ? 'scenario' : intakeStep === 'scenario' && draft.audience === 'business' ? 'package' : 'audience';
    renderIntake();
  }
});
intakeContent.addEventListener('submit', async event => {
  event.preventDefault();
  if (event.target.id === 'intake-org-form') {
    event.target.querySelectorAll('select').forEach(field => { draft[field.name] = field.value; });
    intakeStep = 'goal';
    renderIntake();
    return;
  }
  if (!['professional', 'small-business'].includes(draft.scenario)) ['organizationType', 'organizationSize', 'organizationalLevel', 'department', 'executiveRole'].forEach(field => { delete draft[field]; });
  const submitButton = document.querySelector('#intake-name-form button[type="submit"]');
  const errorBox = document.querySelector('#intake-error');
  errorBox.textContent = '';
  submitButton.disabled = true;
  ['platform', 'audienceSize', 'creatorNeed', 'businessType', 'businessNeed', 'hobby', 'hobbyNeed'].forEach(field => { delete draft[field]; });
  document.querySelectorAll('#intake-name-form input, #intake-name-form select').forEach(field => { draft[field.name] = field.value.trim(); });
  const nextProfile = { ...draft };
  try {
    if (accountState.status === 'guest' && intakeOwner === 'guest') {
      localStorage.setItem(profileKey, JSON.stringify(nextProfile));
      profile = nextProfile;
    } else if (accountState.status === 'ready' && intakeOwner === accountState.email) {
      await window.firebaseLearning.saveProfile(nextProfile);
      if (accountState.status !== 'ready' || intakeOwner !== accountState.email) throw new Error('Account changed while saving.');
    } else throw new Error('Account changed while editing.');
  } catch (error) {
    errorBox.textContent = 'Your profile was not saved. Check your connection and account status, then try again.';
    submitButton.disabled = false;
    return;
  }
  intakeDialog.close();
  activeCategory = 'All topics';
  search.value = '';
  renderFilters();
  updateProfile();
  document.querySelector('#survey').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('#skip-intake').addEventListener('click', () => intakeDialog.close());
document.querySelector('#edit-profile').addEventListener('click', openIntake);
document.querySelector('#clear-profile').addEventListener('click', async () => {
  const button = document.querySelector('#clear-profile');
  button.disabled = true;
  try {
    if (accountState.status === 'guest') { localStorage.removeItem(profileKey); profile = null; updateProfile(); }
    else if (accountState.status === 'ready') await window.firebaseLearning.deleteProfile();
  } catch (error) { document.querySelector('#account-message').textContent = 'Could not delete the profile. Please try again.'; }
  finally { button.disabled = false; }
});
document.querySelector('#import-guest').addEventListener('click', async () => {
  const guest = guestProfile();
  if (!guest || accountState.status !== 'ready' || profile) return;
  const button = document.querySelector('#import-guest');
  button.disabled = true;
  try { await window.firebaseLearning.saveProfile(guest); document.querySelector('#account-message').textContent = 'Guest profile copied to your account. The local copy remains on this device.'; }
  catch (error) { document.querySelector('#account-message').textContent = 'Could not copy the profile. Please try again.'; }
  finally { button.disabled = false; }
});
function handleAccountState(next) {
  accountState = next;
  profile = next.status === 'guest' ? guestProfile() : next.status === 'ready' ? validProfile(next.profile) : null;
  const available = ['guest', 'ready'].includes(next.status);
  document.querySelector('#edit-profile').disabled = !available;
  const storageText = { guest: 'Guest profile saved only on this device.', ready: 'Account profile stored in Firebase for your verified account.', unverified: 'Verify your email to save an account profile.', loading: 'Checking account status...', error: 'Your account profile is unavailable. Retry or sign out.' };
  document.querySelector('#profile-storage').textContent = storageText[next.status];
  document.querySelector('#intake-privacy').textContent = next.status === 'ready' ? 'Your profile will be saved to your verified Firebase account.' : 'Your guest profile stays on this device.';
  if (intakeDialog.open && intakeOwner && intakeOwner !== (next.status === 'guest' ? 'guest' : next.email)) intakeDialog.close();
  updateProfile();
  if (initialAccountState && available) {
    initialAccountState = false;
    if (!profile && next.status === 'guest') openIntake();
  } else if (next.status !== 'loading') initialAccountState = false;
}
window.addEventListener('learning-account-state', event => handleAccountState(event.detail));
window.addEventListener('learning-firebase-unavailable', () => {
  handleAccountState({ status: 'guest', profile: null, email: null });
  document.querySelector('#account-status').textContent = 'Account service is unavailable. Guest profiles remain on this device.';
});
renderFilters();
updateProfile();
if (window.firebaseLearning) handleAccountState(window.firebaseLearning.currentState());
if (window.lucide) window.lucide.createIcons();
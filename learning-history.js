(function () {
  const history = document.querySelector('#learning-history');
  const identity = document.querySelector('#dashboard-identity');
  let account = { status: 'loading', profile: null, email: null };
  let progress = { status: 'loading', records: {} };
  function displayName() {
    if (account.status === 'ready') return account.profile?.name || 'Your learning account';
    if (account.status === 'guest') {
      try { return JSON.parse(localStorage.getItem('atmilio-learning-profile-v1') || '{}').name || 'Guest learner'; } catch (error) { return 'Guest learner'; }
    }
    return '';
  }
  function render() {
    if (account.status === 'ready') identity.textContent = `${displayName()} | ${account.email} | Verified account`;
    else if (account.status === 'guest') identity.textContent = `${displayName()} | Guest profile on this device`;
    else if (account.status === 'unverified') identity.textContent = 'Verify your email to use your learning account.';
    else identity.textContent = account.status === 'loading' ? 'Checking account status...' : 'Account details are unavailable.';
    history.replaceChildren();
    if (!['guest', 'ready'].includes(progress.status)) {
      const notice = document.createElement('p');
      notice.textContent = progress.status === 'loading' ? 'Loading progress...' : 'Course history is unavailable. Check your account and connection.';
      history.append(notice); return;
    }
    const records = Object.entries(progress.records).sort((first, second) => String(second[1]?.updatedAt || '').localeCompare(String(first[1]?.updatedAt || '')));
    let displayed = 0;
    records.forEach(([id, record]) => {
      let title, url, lessonIds;
      if (id.startsWith('role-')) {
        const item = roleCourses.find(course => `role-${course.id}` === id);
        if (!item) return;
        title = item.title; url = `role-course.html?track=${encodeURIComponent(item.id)}`;
        lessonIds = item.lessons.map((lesson, index) => `lesson-${index + 1}`);
      } else {
        const match = /^masterclass-part-([1-9][0-9]*)$/.exec(id);
        const part = match ? masterclass[Number(match[1]) - 1] : null;
        if (!part?.lessons) return;
        title = `AI Mastery: ${part.title}`; url = 'masterclass.html';
        lessonIds = part.lessons.map((lesson, index) => `lesson-${index + 1}`);
      }
      const summary = window.learningProgressUtils.summarize(record, lessonIds);
      const row = document.createElement('div'); row.className = 'history-row';
      const link = document.createElement('a'); link.href = url; link.textContent = title;
      const detail = document.createElement('span'); detail.textContent = `${summary.count} of ${summary.total} lessons | ${summary.percent}%`;
      row.append(link, detail); history.append(row); displayed++;
    });
    if (!displayed) { const empty = document.createElement('p'); empty.textContent = 'No courses started yet.'; history.append(empty); }
  }
  window.addEventListener('learning-account-state', event => { account = event.detail; render(); });
  window.addEventListener('learning-progress-state', event => { progress = event.detail; render(); });
  window.addEventListener('learning-firebase-unavailable', () => { account = { status: 'guest' }; render(); });
  window.addEventListener('learning-progress-unavailable', () => { progress = { status: 'error', records: {} }; render(); });
  if (window.firebaseLearning) account = window.firebaseLearning.currentState();
  if (window.learningProgress) progress = window.learningProgress.currentState();
  render();
})();
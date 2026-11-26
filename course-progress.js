(function () {
  const container = document.querySelector('#course-progress');
  let state = { status: 'loading', records: {} };
  let courseId = null;
  let lessonIds = [];
  let currentLesson = null;
  let pending = false;
  let message = '';
  const attempted = new Set();
  function startIfNeeded() {
    if (!courseId || !state.owner || !['guest', 'ready'].includes(state.status) || state.records[courseId]) return;
    const key = `${state.owner}:${courseId}`;
    if (attempted.has(key)) return;
    attempted.add(key);
    pending = true;
    window.learningProgress.start(courseId).catch(() => { message = 'Could not add this course to your history. Mark a lesson complete to retry.'; }).finally(() => { pending = false; render(); });
  }
  function render() {
    if (!container) return;
    container.replaceChildren();
    if (!courseId || !currentLesson) return;
    startIfNeeded();
    const record = state.records[courseId];
    const summary = window.learningProgressUtils.summarize(record, lessonIds);
    const label = document.createElement('p');
    label.textContent = `${summary.count} of ${summary.total} lessons marked complete (${summary.percent}%)`;
    const meter = document.createElement('progress');
    meter.max = 100; meter.value = summary.percent; meter.setAttribute('aria-label', 'Course progress');
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'button button-dark';
    const done = Array.isArray(record?.completed) && record.completed.includes(currentLesson);
    button.textContent = done ? 'Mark this lesson incomplete' : 'Mark this lesson complete';
    button.disabled = pending || !['guest', 'ready'].includes(state.status);
    button.addEventListener('click', async () => {
      pending = true; message = ''; render();
      try { await window.learningProgress.change(courseId, currentLesson, !done); }
      catch (error) { message = 'Progress was not saved. Check your connection or account status and try again.'; }
      finally { pending = false; render(); }
    });
    const note = document.createElement('p');
    note.className = 'privacy-note';
    note.textContent = message || (state.status === 'guest' ? 'Saved on this device only. Completion is self-reported.' : state.status === 'ready' ? 'Saved to your account. Completion is self-reported.' : state.status === 'unverified' ? 'Verify your email to save account progress.' : state.status === 'loading' ? 'Loading progress...' : 'Progress is unavailable. Check your account or connection.');
    container.append(label, meter, button, note);
  }
  window.courseProgress = {
    show(id, ids, lessonId) { courseId = id; lessonIds = ids; currentLesson = lessonId; message = ''; render(); },
    hide() { courseId = null; render(); }
  };
  window.addEventListener('learning-progress-state', event => { state = event.detail; render(); });
  window.addEventListener('learning-progress-unavailable', () => { state = { status: 'error', records: {} }; render(); });
  if (window.learningProgress) state = window.learningProgress.currentState();
})();
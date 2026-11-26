(function () {
  function summarize(record, lessonIds) {
    const completed = record && Array.isArray(record.completed) ? record.completed : [];
    const count = lessonIds.filter(id => completed.includes(id)).length;
    return { count, total: lessonIds.length, percent: lessonIds.length ? Math.round(count * 100 / lessonIds.length) : 0 };
  }
  function update(record, lessonId, completed) {
    const previous = record && Array.isArray(record.completed) ? record.completed : [];
    const ids = new Set(previous.filter(id => typeof id === 'string'));
    if (completed) ids.add(lessonId); else ids.delete(lessonId);
    return { completed: [...ids], updatedAt: new Date().toISOString() };
  }
  window.learningProgressUtils = { summarize, update };
})();
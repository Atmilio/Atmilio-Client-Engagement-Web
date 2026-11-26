(function () {
  const container = document.querySelector('#lesson-audio');
  const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let lessonKey = null;
  let passages = [];
  let sequence = 0;
  let playing = false;
  let paused = false;
  let status = supported ? 'Ready to read this lesson.' : 'Read aloud is not supported in this browser.';
  const controls = document.createElement('div');
  controls.className = 'audio-controls';
  const play = document.createElement('button');
  play.type = 'button'; play.className = 'audio-button';
  const stopButton = document.createElement('button');
  stopButton.type = 'button'; stopButton.className = 'audio-button audio-button-secondary'; stopButton.textContent = 'Stop';
  const message = document.createElement('p');
  message.className = 'audio-status'; message.setAttribute('role', 'status');
  controls.append(play, stopButton);
  container.append(controls, message);

  function stop(message) {
    sequence += 1;
    if (supported && playing) window.speechSynthesis.cancel();
    playing = false;
    paused = false;
    status = message;
    render();
  }

  function render() {
    container.hidden = !lessonKey;
    play.textContent = playing ? (paused ? 'Resume' : 'Pause') : 'Read lesson aloud';
    play.disabled = !supported || !passages.length;
    stopButton.disabled = !playing;
    message.textContent = status;
  }
  play.addEventListener('click', () => {
      if (playing) {
        if (paused) { window.speechSynthesis.resume(); paused = false; status = 'Reading lesson.'; }
        else { window.speechSynthesis.pause(); paused = true; status = 'Narration paused.'; }
        render();
        return;
      }
      const current = ++sequence;
      const queue = passages.slice();
      playing = true; paused = false; status = 'Reading lesson.'; render();
      function speakNext() {
        if (current !== sequence) return;
        if (!queue.length) { stop('Lesson narration finished.'); return; }
        const utterance = new SpeechSynthesisUtterance(queue.shift());
        utterance.lang = document.documentElement.lang || 'en';
        utterance.onend = speakNext;
        utterance.onerror = () => { if (current === sequence) stop('Narration could not be played. Please try again.'); };
        window.speechSynthesis.speak(utterance);
      }
      speakNext();
  });
  stopButton.addEventListener('click', () => { stop('Narration stopped.'); play.focus(); });

  window.lessonAudio = {
    show(key, text) {
      if (lessonKey !== key) stop('Ready to read this lesson.');
      lessonKey = key;
      passages = text.filter(value => typeof value === 'string' && value.trim()).map(value => value.trim());
      if (!supported) status = 'Read aloud is not supported in this browser.';
      render();
    },
    hide() { stop('Narration stopped.'); lessonKey = null; render(); }
  };
  window.addEventListener('pagehide', () => stop('Narration stopped.'));
})();
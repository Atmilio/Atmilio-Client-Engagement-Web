import './firebase-account.js';
import { auth, db } from './firebase-config.js';
import { collection, doc, getDocsFromServer, runTransaction } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

const guestKey = 'atmilio-learning-progress-v1';
let state = { status: 'loading', records: {} };
let generation = 0;
let busy = false;

function publish(next) {
  state = next;
  window.dispatchEvent(new CustomEvent('learning-progress-state', { detail: state }));
}
function readGuest() {
  try {
    const data = JSON.parse(localStorage.getItem(guestKey) || '{}');
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch (error) { return {}; }
}
async function handleAccount(account) {
  const sequence = ++generation;
  if (account.status === 'guest') { publish({ status: 'guest', owner: 'guest', records: readGuest() }); return; }
  if (account.status !== 'ready') { publish({ status: account.status, records: {} }); return; }
  const user = auth.currentUser;
  if (!user || !user.emailVerified || user.email !== account.email) { publish({ status: 'error', records: {} }); return; }
  publish({ status: 'loading', records: {} });
  try {
    const snapshot = await getDocsFromServer(collection(db, 'learningProgress', user.uid, 'courses'));
    if (sequence !== generation || auth.currentUser !== user) return;
    const records = {};
    snapshot.forEach(item => { records[item.id] = item.data(); });
    publish({ status: 'ready', owner: user.uid, records });
  } catch (error) {
    if (sequence === generation && auth.currentUser === user) publish({ status: 'error', records: {} });
  }
}
async function change(courseId, lessonId, completed) {
  if (busy) throw new Error('A progress update is already in progress.');
  if (!/^[a-z0-9-]{1,100}$/.test(courseId) || !/^lesson-[1-9][0-9]*$/.test(lessonId)) throw new Error('Invalid progress identifier.');
  busy = true;
  try {
    if (state.status === 'guest') {
      const records = readGuest();
      records[courseId] = window.learningProgressUtils.update(records[courseId], lessonId, completed);
      localStorage.setItem(guestKey, JSON.stringify(records));
      publish({ status: 'guest', owner: 'guest', records });
      return;
    }
    if (state.status !== 'ready') throw new Error('Progress is unavailable.');
    const user = auth.currentUser;
    const sequence = generation;
    if (!user || !user.emailVerified) throw new Error('A verified account is required.');
    const reference = doc(db, 'learningProgress', user.uid, 'courses', courseId);
    const record = await runTransaction(db, async transaction => {
      const snapshot = await transaction.get(reference);
      const updated = window.learningProgressUtils.update(snapshot.exists() ? snapshot.data() : null, lessonId, completed);
      transaction.set(reference, updated);
      return updated;
    });
    if (sequence !== generation || auth.currentUser !== user) throw new Error('Account changed while saving.');
    publish({ status: 'ready', owner: user.uid, records: { ...state.records, [courseId]: record } });
  } finally { busy = false; }
}
async function start(courseId) {
  if (busy || !['guest', 'ready'].includes(state.status)) throw new Error('Progress is unavailable.');
  if (!/^[a-z0-9-]{1,100}$/.test(courseId)) throw new Error('Invalid course identifier.');
  busy = true;
  try {
    if (state.status === 'guest') {
      const records = readGuest();
      if (!records[courseId]) records[courseId] = { completed: [], updatedAt: new Date().toISOString() };
      localStorage.setItem(guestKey, JSON.stringify(records));
      publish({ status: 'guest', owner: 'guest', records });
      return;
    }
    const user = auth.currentUser;
    const sequence = generation;
    if (!user || !user.emailVerified) throw new Error('A verified account is required.');
    const reference = doc(db, 'learningProgress', user.uid, 'courses', courseId);
    const record = await runTransaction(db, async transaction => {
      const snapshot = await transaction.get(reference);
      if (snapshot.exists()) return snapshot.data();
      const created = { completed: [], updatedAt: new Date().toISOString() };
      transaction.set(reference, created);
      return created;
    });
    if (sequence !== generation || auth.currentUser !== user) throw new Error('Account changed while saving.');
    publish({ status: 'ready', owner: user.uid, records: { ...state.records, [courseId]: record } });
  } finally { busy = false; }
}
window.learningProgress = { currentState: () => state, change, start };
window.addEventListener('learning-account-state', event => handleAccount(event.detail));
if (window.firebaseLearning) handleAccount(window.firebaseLearning.currentState());
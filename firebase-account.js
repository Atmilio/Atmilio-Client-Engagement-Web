import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut, reload } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import { doc, getDocFromServer, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

let state = { status: 'loading', profile: null, email: null };
let generation = 0;
let mode = 'signin';
const guestKey = 'atmilio-learning-profile-v1';
const accountDialog = document.querySelector('#account-dialog');

function publish(next) {
  state = next;
  window.dispatchEvent(new CustomEvent('learning-account-state', { detail: state }));
  renderAccount();
}
function currentState() { return state; }
function userReference(user) { return doc(db, 'learningProfiles', user.uid); }
function requireVerified() {
  const user = auth.currentUser;
  if (!user || !user.emailVerified || state.status !== 'ready') throw new Error('Verify your email and wait for your account profile to load.');
  return user;
}
async function loadAccount(user) {
  const sequence = ++generation;
  if (!user) { publish({ status: 'guest', profile: null, email: null }); return; }
  publish({ status: 'loading', profile: null, email: user.email });
  try {
    await reload(user);
    if (sequence !== generation || auth.currentUser !== user) return;
    if (!user.emailVerified) { publish({ status: 'unverified', profile: null, email: user.email }); return; }
    await user.getIdToken(true);
    const snapshot = await getDocFromServer(userReference(user));
    if (sequence !== generation || auth.currentUser !== user) return;
    publish({ status: 'ready', profile: snapshot.exists() ? snapshot.data().profile || null : null, email: user.email });
  } catch (error) {
    if (sequence !== generation || auth.currentUser !== user) return;
    publish({ status: 'error', profile: null, email: user.email });
  }
}
async function saveProfile(profile) {
  const user = requireVerified();
  const sequence = generation;
  await setDoc(userReference(user), { profile });
  if (sequence !== generation || auth.currentUser !== user) throw new Error('Account changed while saving.');
  publish({ status: 'ready', profile, email: user.email });
}
async function deleteProfile() {
  const user = requireVerified();
  const sequence = generation;
  await deleteDoc(userReference(user));
  if (sequence !== generation || auth.currentUser !== user) throw new Error('Account changed while deleting.');
  publish({ status: 'ready', profile: null, email: user.email });
}
window.firebaseLearning = { currentState, saveProfile, deleteProfile };
onAuthStateChanged(auth, loadAccount, () => publish({ status: 'error', profile: null, email: null }));

function renderAccount() {
  const status = document.querySelector('#account-status');
  if (!status) return;
  const messages = { loading: 'Checking your account...', guest: 'You are browsing as a guest.', unverified: 'Verify your email before saving an account profile.', ready: 'Signed in with a verified email.', error: 'Could not load your account profile. Check your connection and Firebase setup.' };
  status.textContent = `${messages[state.status]}${state.email ? ` ${state.email}` : ''}`;
  document.querySelector('#open-account').disabled = state.status === 'loading';
  document.querySelector('#open-account').hidden = Boolean(state.email);
  document.querySelector('#verify-email').hidden = state.status !== 'unverified';
  document.querySelector('#refresh-verification').hidden = state.status !== 'unverified' && state.status !== 'error';
  document.querySelector('#sign-out').hidden = !state.email;
  const importButton = document.querySelector('#import-guest');
  let guestExists = false;
  try { guestExists = Boolean(localStorage.getItem(guestKey)); } catch (error) { guestExists = false; }
  importButton.hidden = !(state.status === 'ready' && !state.profile && guestExists);
}
function friendlyError(error) {
  const messages = { 'auth/invalid-email': 'Enter a valid email address.', 'auth/invalid-credential': 'Email or password is incorrect.', 'auth/weak-password': 'Choose a stronger password that meets the account policy.', 'auth/email-already-in-use': 'Unable to create the account. Try signing in or resetting your password.', 'auth/too-many-requests': 'Too many attempts. Please try again later.', 'auth/network-request-failed': 'Network error. Check your connection and try again.', 'auth/operation-not-allowed': 'Email/password sign-in is not enabled for this Firebase project.' };
  return messages[error.code] || 'Unable to complete that request. Check your connection and try again.';
}
if (accountDialog) {
  const form = document.querySelector('#account-form');
  const email = document.querySelector('#account-email');
  const password = document.querySelector('#account-password');
  const confirmation = document.querySelector('#account-confirm');
  const errorBox = document.querySelector('#account-form-error');
  const message = document.querySelector('#account-message');
  const submit = document.querySelector('#account-submit');
  function setMode(next) {
    mode = next;
    const creating = mode === 'signup';
    document.querySelector('#account-title').textContent = creating ? 'Create account' : 'Sign in';
    document.querySelector('#confirm-field').hidden = !creating;
    confirmation.required = creating;
    confirmation.value = '';
    password.autocomplete = creating ? 'new-password' : 'current-password';
    if (creating) password.minLength = 8; else password.removeAttribute('minlength');
    submit.textContent = creating ? 'Create account' : 'Sign in';
    document.querySelector('#toggle-account-mode').textContent = creating ? 'Already have an account? Sign in' : 'Create an account';
    errorBox.textContent = '';
  }
  document.querySelector('#open-account').addEventListener('click', () => { setMode('signin'); accountDialog.showModal(); });
  document.querySelector('#close-account').addEventListener('click', () => accountDialog.close());
  document.querySelector('#toggle-account-mode').addEventListener('click', () => setMode(mode === 'signin' ? 'signup' : 'signin'));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    errorBox.textContent = '';
    if (mode === 'signup' && password.value !== confirmation.value) { errorBox.textContent = 'Passwords do not match.'; return; }
    submit.disabled = true;
    try {
      if (mode === 'signup') {
        const credential = await createUserWithEmailAndPassword(auth, email.value.trim(), password.value);
        try { await sendEmailVerification(credential.user); message.textContent = 'Account created. Check your email to verify your address.'; }
        catch (error) { message.textContent = 'Account created, but the verification email could not be sent. Use Resend verification email.'; }
      } else {
        await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
        message.textContent = '';
      }
      form.reset();
      accountDialog.close();
    } catch (error) { errorBox.textContent = friendlyError(error); }
    finally { submit.disabled = false; }
  });
  document.querySelector('#reset-password').addEventListener('click', async () => {
    if (!email.value.trim() || !email.checkValidity()) { errorBox.textContent = 'Enter a valid email address above first.'; email.focus(); return; }
    try { await sendPasswordResetEmail(auth, email.value.trim()); errorBox.textContent = 'If an account exists for this address, a reset email will be sent.'; }
    catch (error) { errorBox.textContent = error.code === 'auth/user-not-found' ? 'If an account exists for this address, a reset email will be sent.' : friendlyError(error); }
  });
  document.querySelector('#verify-email').addEventListener('click', async () => {
    try { if (!auth.currentUser) throw new Error(); await sendEmailVerification(auth.currentUser); message.textContent = 'Verification email sent. Check your inbox.'; }
    catch (error) { message.textContent = friendlyError(error); }
  });
  document.querySelector('#refresh-verification').addEventListener('click', () => loadAccount(auth.currentUser));
  document.querySelector('#sign-out').addEventListener('click', async () => {
    try { await signOut(auth); message.textContent = 'Signed out.'; }
    catch (error) { message.textContent = friendlyError(error); }
  });
  renderAccount();
}
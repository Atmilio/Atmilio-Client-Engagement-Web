import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB9ni3-sZ4NEwlV1JEm5pZUMf0SjnFGxNE',
  authDomain: 'atmilio.firebaseapp.com',
  projectId: 'atmilio',
  storageBucket: 'atmilio.firebasestorage.app',
  messagingSenderId: '948755165972',
  appId: '1:948755165972:web:e6a9b0ee91bbaf02310801',
  measurementId: 'G-L3YKPW8WM5'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
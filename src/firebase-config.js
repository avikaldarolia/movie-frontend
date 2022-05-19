import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAvs3HI6bFs0PxrFLW4UWfGkTA9oyPW7Jk',
  authDomain: 'movie-431a0.firebaseapp.com',
  projectId: 'movie-431a0',
  storageBucket: 'movie-431a0.appspot.com',
  messagingSenderId: '637430737790',
  appId: '1:637430737790:web:a9f2fc65f807550646212f',
  measurementId: 'G-9FNY6GF60Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

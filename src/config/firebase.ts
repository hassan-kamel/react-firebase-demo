import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { ISignupForm } from '../pages/SignUp';

const firebaseConfig = {
  apiKey: 'AIzaSyBGLQgY5uuA3zgpTUmFw8UaIgkgTeacIs8',
  authDomain: 'react-firebase-demo-ba1ce.firebaseapp.com',
  projectId: 'react-firebase-demo-ba1ce',
  storageBucket: 'react-firebase-demo-ba1ce.appspot.com',
  messagingSenderId: '561743685940',
  appId: '1:561743685940:web:33bc6779ada75891d75d61',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const createAuthUser = async (fields: ISignupForm) => {
  if (!fields.email || !fields.password) return;
  return await createUserWithEmailAndPassword(
    auth,
    fields.email,
    fields.password,
  );
};

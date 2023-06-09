import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { ISignupForm } from '../pages/SignUp';
// import React from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
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

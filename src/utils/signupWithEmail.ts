import { UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ISignupForm } from '../pages/SignUp';
import { db } from '../config/firebase';

export const signupAndCreateUser = async (
  userAuth: UserCredential | void,
  fields: ISignupForm,
) => {
  if (!userAuth?.user) return;

  const userDocRef = doc(db, 'users', userAuth.user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { ...fields, createdAt });
      localStorage.setItem('token', await userAuth.user.getIdToken());
    } catch (error: ErrorCallback | any) {
      console.log('error creating the user', error?.message);
    }
  } else {
    console.log('user already exist ');
  }
  return userDocRef;
};

/* eslint-disable prefer-destructuring */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

import userStore from 'stores/user'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const signInWithEmail = async (email, password) => {
  let check = false
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      check = true
      const user = userCredential.user
      userStore.setState({ user, accessToken: user?.accessToken })
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Email hoặc mật khẩu không đúng')
      }
    })
  return check
}

export const logout = async () => {
  signOut(auth)
}

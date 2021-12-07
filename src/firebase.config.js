import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDTbqmUcCDRv3TYwnn69GxIJov9fhds9GA',
  authDomain: 'house-marketplace-app-9e63b.firebaseapp.com',
  projectId: 'house-marketplace-app-9e63b',
  storageBucket: 'house-marketplace-app-9e63b.appspot.com',
  messagingSenderId: '699346245091',
  appId: '1:699346245091:web:d27cb8456a1564b36cfcd6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()

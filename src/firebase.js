import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA_oampZhjqnzy2w8aLbHjhHrOvjHfg0FI',
	authDomain: 'speakup-47538.firebaseapp.com',
	projectId: 'speakup-47538',
	storageBucket: 'speakup-47538.appspot.com',
	messagingSenderId: '385304261879',
	appId: '1:385304261879:web:e117bb37923bc5cb24cff2',
	measurementId: 'G-E3K9MVDWX8',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };

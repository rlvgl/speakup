import { db } from './firebase';
import {
	collection,
	addDoc,
	doc,
	getDoc,
	query,
	where,
	getDocs,
	setDoc,
	orderBy,
	limit,
} from 'firebase/firestore';

export const getPostById = async (id) => {
	try {
		const docRef = doc(db, 'posts', id);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw Error('post does not exist');
		}
		return docSnap.data();
	} catch (e) {
		console.log(e);
	}
};

export const getAllPosts = async () => {
	try {
		const q = query(
			collection(db, 'posts'),
			orderBy('created_at', 'desc'),
			limit(25)
		);
		const querySnapshot = await getDocs(q);
		const docArray = [];
		querySnapshot.forEach((doc) => docArray.push(doc.data()));
		return docArray;
	} catch (e) {
		console.log(e);
	}
};

export const getUserPosts = async (email) => {
	try {
		const q = query(
			collection(db, 'posts'),
			where('creator', '==', email),
			orderBy('created_at', 'desc'),
			limit(25)
		);
		const querySnapshot = await getDocs(q);
		const docArray = [];
		querySnapshot.forEach((doc) => docArray.push(doc.data()));
		return docArray;
	} catch (e) {
		console.log(e);
	}
};

export const getPostByTag = async (tag) => {
	// tag var should be cleaned before sending request
	try {
		const q = query(
			collection(db, 'posts'),
			where('tags', 'array-contains', tag)
		);
		const querySnapshot = await getDocs(q);
		const docArray = [];
		querySnapshot.forEach((doc) => docArray.push(doc.data()));
		return docArray;
	} catch (e) {
		console.log(e);
	}
};

export const createPost = async (info) => {
	try {
		await addDoc(collection(db, 'posts'), {
			created_at: new Date(),
			creator: info.email,
			creator_name: info.name,
			message: info.message,
			tags: info.tags,
		});
	} catch (e) {
		console.log(e);
	}
};

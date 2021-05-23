import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyD4yvbLLtUIvOzYi6f12QNNleyPjdr-miw",
	authDomain: "parcial2pdp.firebaseapp.com",
	databaseURL: "https://parcial2pdp-default-rtdb.firebaseio.com",
	projectId: "parcial2pdp",
	storageBucket: "parcial2pdp.appspot.com",
	messagingSenderId: "1061520960135",
	appId: "1:1061520960135:web:a8f2621a48ecd528cca622"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "virtual-canvas.firebaseapp.com",
    databaseURL: "https://virtual-canvas.firebaseio.com",
    projectId: "virtual-canvas",
    storageBucket: "virtual-canvas.appspot.com",
    messagingSenderId: "331574050775",
    appId: "1:331574050775:web:199288fb0d1e763ed81592",
    measurementId: "G-KHGVVPE55P"
  };


firebase.initializeApp(firebaseConfig)
export default firebase
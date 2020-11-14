import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDovtuKWsbFUllE-OVYSbVQLm0rOqjuuCI",
    authDomain: "react-olx-b86ac.firebaseapp.com",
    databaseURL: "https://react-olx-b86ac.firebaseio.com",
    projectId: "react-olx-b86ac",
    storageBucket: "react-olx-b86ac.appspot.com",
    messagingSenderId: "12708957230",
    appId: "1:12708957230:web:4005826789d71d2e3663bf"
};


export default firebase.initializeApp(firebaseConfig);
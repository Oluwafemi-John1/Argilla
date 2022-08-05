 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
 import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
 import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
 import { getStorage, uploadBytes, ref as stRef, uploadBytesResumables, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyBSQY_zM-acKHS-M5ey6cdXuoTleRNITis",
   authDomain: "e-commerce-3607f.firebaseapp.com",
   projectId: "e-commerce-3607f",
   storageBucket: "e-commerce-3607f.appspot.com",
   messagingSenderId: "418833083928",
   appId: "1:418833083928:web:c158914261e0776c8e5d6d",
   measurementId: "G-SVP5W9KTXX"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getDatabase();
 const auth = getAuth();
 const storage = getStorage();

 let userDetails = {}
 onAuthStateChanged(auth, (user) => {
    if (user) {
        userDetails.email = user.email;
        userDetails.uid = user.uid;
    } else {
        window.location = "signUp.html"
    }
 })

 let dbRef = ref(db, "tools");
 let todoArray = [];
 let todoId = 0;
 onValue(dbRef, function(snapshot) {
    todoArray = snapshot.val();
    if (todoArray) {
        todoId = todoArray.length;
        displayTodo(todoArray);
    } else {
        todoId = 0;
    }
 })
 const todoBtn = () => {
    
 }
 window.todoBtn = todoBtn
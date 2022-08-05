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
    let todo = {pname:todoInp.value,price:todoInp2.value,Discount:todoInp3.value, Q_Available: quantity.value}
    let files = fileInp.files[0];
    let fileName = files.name;
    let date = new Date();

    let todoObj = {email: userDetails.email, img_name: fileName, todo, time: date.toLocaleTimeString()};
    let todoRef = ref(db, `todos/${todoId}`);
    set(todoRef, todoObj);

    let imgRef = stRef(storage, `images/${fileName}`);
    let uploadImage = uploadBytesResumable(imgRef, files);
    uploadImage.on("state-changed", function(snapshot){
        let totalBytes = snapshot.totalBytes;
        let bytesTransferred = snapshot.bytesTransferred;
        let progress = Math.round((bytesTransferred/totalBytes) * 100);

        loader.innerHTML = `<div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${progress}%"><span style="font-size: 20px;float:right;" class="px-2">${progress}%</span></div>
        </div>`;
    }, function (error) {
        loader.innerHTML = `${error}%`
    }, function () {
        loader.innerHTML = "Uploaded!";
        loader.style.background = "green";
        loader.style.color = "white";
    })
    
    todoInp.value = "";
    todoInp2.value = "";
    todoInp3.value = "";
    fileInp.value = "";
    quantity.value = "";
 }
 window.todoBtn = todoBtn

 const displayTodo = (todoArray) => {
    let userTodo = todoArray.filter((each)=> each.email == userDetails.email);
    userTodo.map((todo, i) => {
        let imgRef = stRef(storage, `images/${todo.img_name}`);
        getDownloadURL(imgRef).then((url) => {
            allTodo.innerHTML += `<div class="col-sm-12 col-lg-2 col-md-5 card shadow mx-md-3 mt-4 mb-3 p-2">
                <img src="${url}" style="height: 70%; object-fit: cover; border-radius:6px 6px 0 0;">
                <span style="font-size: 20px;" class="px-2">${todo.todo.pname}</span>
                <span style="font-size: 20px;" class="px-2">$ ${todo.todo.price}</span>
                <span style="font-size: 20px;" class="px-2">Discount: -${todo.todo.Discount}%</span>
                <span style="font-size: 20px;" class="px-2"><i class="text-muted" style="font-size: 10px;">${todo.time}</i></span>
                <button class="btn btn-dark my-2" style="border-radius:0 0 px 6px;" id="${i}">Delete</button>
            </div>`
        })
    })
}

const signOuter = () => {
    signOut(auth).then((response) => {
        window.location = "signIn.html";
    }).catch((error) => {
        console.log(response);
    })
}
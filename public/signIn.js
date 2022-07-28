        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
        // import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
        import { getDatabase } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
        import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
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
        // const analytics = getAnalytics(app);
        const db = getDatabase();
        const auth = getAuth();
        const provider = new GoogleAuthProvider();


    const signUpNo = () => {
        window.location = "signUp.html"
    }
    window.signUpNo = signUpNo;

    const signIn = () => {
        let mail = email.value;
        let pass = password.value;

        signInWithEmailAndPassword(auth, mail, pass)
        .then((credentials) => {
            console.log(credentials);
            window.location = "index.html"
        }).catch ((error) => {
            reset.innerHTML = `<div class="alert alert-danger text-center w-75 mx-auto bg-glass">${error.code}</div>`

        })

    }
    window.signIn = signIn;

    const signInG = () => {
        signInWithPopup(auth, provider)
        .then((credentials) => {
            // console.log(credentials);
            window.location = "index.html"
        }).catch((error))
    }
    window.signInG = signInG;
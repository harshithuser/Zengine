// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyClP4dKexFNmxjVIr282Qd8Ns5l0pt1gYM",
    authDomain: "zengine-corporation.firebaseapp.com",
    projectId: "zengine-corporation",
    storageBucket: "zengine-corporation.firebasestorage.app",
    messagingSenderId: "654143489554",
    appId: "1:654143489554:web:8cde8aa9c038f698ce3acb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let isSignIn = true;

onAuthStateChanged(auth, (user) => {
    const popup = document.getElementById("auth-popup");
    const signOutBtn = document.getElementById("signOutButton");
    const profileContainer = document.getElementById("profile-container");

    if (user) {
        popup.style.display = "none";
        signOutBtn.style.display = "block";
        profileContainer.style.display = "flex";
        document.getElementById("profile-img").src = user.photoURL || "default-profile-img.png";
    } else {
        popup.style.display = "flex";
        signOutBtn.style.display = "none";
        profileContainer.style.display = "none";
    }
});

window.toggleAuthMode = () => {
    isSignIn = !isSignIn;
    document.getElementById("popup-title").textContent = isSignIn ? "Sign In" : "Sign Up";
    document.getElementById("authButton").textContent = isSignIn ? "Sign In" : "Sign Up";
    document.getElementById("toggle-link").textContent = isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In";
};

window.handleAuth = async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        if (isSignIn) {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in successfully!");
            localStorage.setItem("isSignIn", "true");
            window.location.href = "mobile.html";
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully!");
            localStorage.setItem("isSignIn", "true");
            window.location.href = "mobile.html";
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
};

window.forgotPassword = async () => {
    const email = document.getElementById("email").value.trim();
    if (!email) return alert("Please enter your email.");
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

window.signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
        alert("Signed in with Google!");
        localStorage.setItem("isSignIn", "true");
        window.location.href = "mobile.html";
    } catch (error) {
        alert("Google Sign-In Error: " + error.message);
        localStorage.removeItem("isSignIn");
    }
};

window.logout = async () => {
    try {
        await signOut(auth);
        alert("Signed out!");
        localStorage.removeItem("isSignIn");
    } catch (error) {
        alert("Error signing out: " + error.message);
    }
};

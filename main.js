// main.js
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
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

// Elements
const userPic = document.getElementById("user-pic");
const userPicSubmenu = document.getElementById("user-pic-submenu");
const userSubmenuName = document.getElementById("sub-menu-name");
const loginLink = document.querySelector("a.login");
const subMenu = document.getElementById("subMenu");
const signOutBtn = document.getElementById("signout");



// Toggle submenu
function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}
window.toggleMenu = toggleMenu;

// Close submenu on outside click
document.addEventListener("click", function (event) {
  if (!subMenu.contains(event.target) && event.target.id !== "user-pic") {
    subMenu.classList.remove("open-menu");
  }
});

// Handle Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    userPic.style.display = "block";
    userPic.src = user.photoURL || "images/user.png";
    userPicSubmenu.src = userPic.src;
    userSubmenuName.textContent = user.displayName || "User";
    signOutBtn.style.display = "block";
    loginLink.style.display = "none";
    loginLink.removeAttribute("href");
    loginLink.onclick = async (e) => {
      e.preventDefault();
      await signOut(auth);
    };

  } else {
    userPic.style.display = "none";
    userPic.src = "";
    userPicSubmenu.src = "";
    userSubmenuName.textContent = "Guest";
    loginLink.style.display = "block"
    loginLink.textContent = "Login";
    loginLink.style.background = "#00f0ff";
    loginLink.href = "login.html";
    loginLink.onclick = null;
    signOutBtn.style.display = "none";
   
  }
});

window.logout = async () => {
      try {
        await signOut(auth);
        alert("Signed out!");
        localStorage.removeItem("isSignIn");
        location.reload();
      } catch (error) {
        alert("Error signing out: " + error.message);
      }
    };

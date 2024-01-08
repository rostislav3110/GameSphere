import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS_WxUDxDtCvd_tg4Tjy_uqfs5elnQjWA",
  authDomain: "gamesphere-dd8df.firebaseapp.com",
  projectId: "gamesphere-dd8df",
  storageBucket: "gamesphere-dd8df.appspot.com",
  messagingSenderId: "412982700023",
  appId: "1:412982700023:web:36edefd7bf98af82c6f0f2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const prepareAuth = () => {
  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const userIcon = document.querySelector(".user-icon");
  const shopCart = document.querySelector(".shop-cart");

  if (!loginButton) return;

  let userData;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const savedUserData = localStorage.getItem("user");
      if (savedUserData) {
        userData = JSON.parse(savedUserData);
      }
      loginButton.style.display = "none";
      logoutButton.style.display = "block";
      userIcon.src = user.photoURL;
      userIcon.style.display = "block";
      shopCart.style.display = "block";
    } else {
      loginButton.style.display = "block";
      logoutButton.style.display = "none";
      userIcon.style.display = "none";
      shopCart.style.display = "none";
    }
  });

  loginButton.addEventListener("click", (e) => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("authorization user", user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("error authorization", errorMessage);
      });
  });

  logoutButton.addEventListener("click", (e) => {
    signOut(auth)
      .then(() => {
        console.log("Користувач вийшов");
        localStorage.removeItem("user");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  });
}

window.addEventListener("load", (event) => {
  prepareAuth()
});

window.addEventListener('hashchange', function () {
  prepareAuth()
});
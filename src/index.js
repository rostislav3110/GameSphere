import "./styles/main.scss";

import "./js/games";

import video_guide from "./assets/video-guide.json";
import postPublic from "./assets/posts.json";
import storeGame from "./assets/store_game.json";

import mainTemplate from "./pages/main.hbs";
import guideTemplate from "./pages/guide.hbs";
import postsTemplate from "./pages/posts.hbs";
import storeTemplate from "./pages/store.hbs";

const templates = {
  "/": mainTemplate,
  "/guide": guideTemplate,
  "/posts": postsTemplate,
  "/store": storeTemplate,
};

const pageData = { video_guide, postPublic, storeGame };
const targetElement = document.getElementById("app");

const render = (template, data, targetElement) => {
  const renderedHTML = template(data);
  targetElement.innerHTML = renderedHTML;
};

const navigateTo = (path) => {
  render(templates[path], pageData, targetElement);
};

window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  render(templates[path], pageData, targetElement);
});

window.onload = () => {
  let path = window.location.pathname;

  if (/\.\w+$/.test(path)) {
    const basePath = window.location.pathname.replace(/\/[^/]+$/, "");
    path = window.location.pathname
      .replace(new RegExp(`^${basePath}`), "")
      .replace(".html", "")
      .replace("index", "");
  }

  navigateTo(path);
};





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

window.addEventListener("load", (event) => {
  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const userIcon = document.querySelector(".user-icon");
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
    } else {
      loginButton.style.display = "block";
      logoutButton.style.display = "none";
      userIcon.style.display = "none";
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
});


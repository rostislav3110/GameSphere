import video_guide from "../assets/video-guide.json";
import postPublic from "../assets/posts.json";
import storeGame from "../assets/store_game.json";

import mainTemplate from "../pages/main.hbs";
import guideTemplate from "../pages/guide.hbs";
import postsTemplate from "../pages/posts.hbs";
import storeTemplate from "../pages/store.hbs";

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
  prepareHeaderLinks();
  window.dispatchEvent(new Event('hashchange'));
};

window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  render(templates[path], pageData, targetElement);
});

window.onload = () => {
  handlePageLoad();
};

const handlePageLoad = () => {
  let path = window.location.pathname;

  if (/\.\w+$/.test(path)) {
    const basePath = window.location.pathname.replace(/\/[^/]+$/, "");
    path = window.location.pathname
      .replace(new RegExp(`^${basePath}`), "")
      .replace(".html", "")
      .replace("index", "");
  }

  navigateTo(path);
}

const prepareHeaderLinks = () => {
  const navLinks = document.querySelectorAll('.navbar-nav a');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      window.history.pushState(null, '', link.href);
      handlePageLoad()
    });
  });
}

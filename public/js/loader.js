setTimeout(() => {
  const body = document.getElementsByTagName("body")?.[0];

  if (body && !body.classList.contains("hide-loader")) {
    body.classList.add("hide-loader");
  }
}, 1000);

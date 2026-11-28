function getPath() {
  return window.location.hash.slice(1) || "/"
}

async function renderPage(path) {
  const page = {
    "/": {
        path: "./pages/Welcome/WelcomePage.js",
        name: "welcome-page",
    },
    "/home": {
        path: "./pages/Home/HomePage.js",
        name: "home-page",
    },
    "/radio": {
        path: "./pages/Radio/RadioPage.js",
        name: "radio-page",
    },
  }[path];

  try {
    await import(page.path);
  } catch (err) {
    console.log(err);
    window.location.href = "./not_found.html";
  }

  const root = document.querySelector("root");

  root.replaceChildren(
    document.createElement(page.name)
  );
}

async function navigate(path) {
  history.pushState({}, "", `#${path}`);
  renderPage(path);
}

// Initial page
renderPage(getPath());

// Handle forward and backwards in history
window.addEventListener("popstate", () => {
  renderPage(getPath());
})

export { navigate };

async function navigate(path) {
  const page = {
    "/": {
        path: "./pages/Welcome/WelcomePage.js",
        name: "welcome-page",
    },
    "/home": {
        path: "./pages/Home/HomePage.js",
        name: "home-page",
    },
  }[path];

  // Need to make a custom 404 page
  // if (!page) {
  // }

  await import(page.path);

  const root = document.querySelector("root");
 
  root.replaceChildren(
    document.createElement(page.name)
  );
}

function getPath() {
  return window.location.hash.slice(1) || "/"
}

// Initial page
navigate(getPath());

// Handle forward and backwards in history
window.addEventListener("hashchange", () => {
  navigate(getPath());
})

export { navigate };

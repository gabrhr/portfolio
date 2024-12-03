window.onload = function () {
  var history = "";

  let routes = {
    "": "docs/home.html",
    "/": "docs/home.html",
    "#/home": "docs/home.html",
    "#/about": "docs/about.html",
    "#/projects": "docs/projects.html",
    "#/contact": "docs/contact.html",
  };

  function router() {
    console.log("document.referrer: " + document.referrer);
    var link = window.location.hash;
    var innerElement = "";

    var count = link.split("/").length - 1;
    if (count > 1) {
      innerElement = link.split("/")[2];
      link = "#/" + link.split("/")[1];
    }

    if (history === link && innerElement) {
      scrollIntoView(innerElement);
      history = link;
      return;
    }

    history = link;
    var route = routes[link];
    if (route) loadPage(route, innerElement);
  }
  router();

  window.addEventListener("hashchange", router);

  async function loadPage(url, innerElement) {
    // load page
    console.log("url:", url);
    const res = await fetch(url);
    const content = await res.text();
    const element = document.getElementById("content");
    element.innerHTML = content;

    window.scrollTo(0, 0);

    // element scroll into view
    if (innerElement) {
      scrollIntoView(innerElement);
    }
  }

  function scrollIntoView(id) {
    document.getElementById(id).scrollIntoView();
  }
};

//footer
const footerString = "Copyright © 2024 | Portfolio Gabriela Hernandez";
const footer = document.getElementById("footer-text");

const containerDivFooter = document.createElement("div");
containerDivFooter.className = "container padd-25";
const footerText = document.createElement("p");
footerText.textContent = footerString;
containerDivFooter.appendChild(footerText);
footer.appendChild(containerDivFooter);

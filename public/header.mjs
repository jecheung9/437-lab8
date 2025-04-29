import { toHtmlElement } from "./toHtmlElement.mjs";

function header() {
    console.log("aaaa");
    let header = document.createElement('header');
    let h1 = document.createElement('h1');
    h1.innerText = "Jeffrey Cheung";

    let nav = document.createElement("nav");

    let currentPage = window.location.pathname;
    let links;

    if (currentPage === "/index.html" || currentPage === "/") {
        links = toHtmlElement(
            `<a href="index2.html"> Subpage</a>`
        );
    };

    if (currentPage === "/index2.html") {
        links = toHtmlElement(
            `<a href="index.html"> Main Page</a>`
        );
    };

    let menubutton = document.createElement("button");
    menubutton.innerText = "Menu"
    menubutton.className = "menu-button"


    nav.append(links);
    header.append(h1);
    header.append(menubutton);
    header.append(nav);
    document.body.prepend(header);

    menubutton.addEventListener("click", () => {
        if (nav.style.display === "none" || nav.style.display === "") {
            nav.style.display = "block";
        } else {
            nav.style.display = "none";
        }
    });


    // maybe unnecessary, but fixing the link disappearing when going back
    // to desktop width.
    let isMenuHandled = false;
    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            if (!isMenuHandled) {
                nav.style.display = "flex"; 
                isMenuHandled = true; 
            }
        } else {
            if (isMenuHandled) {
                nav.style.display = "none";
                isMenuHandled = false; 
            }
        }
    });

    document.addEventListener("click", (e) => {
        if (!header.contains(e.target) && window.innerWidth <= 600) {
            nav.style.display = "none";
        }
    });
}

header();
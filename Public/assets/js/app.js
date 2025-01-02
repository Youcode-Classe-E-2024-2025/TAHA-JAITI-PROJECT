import page from "page";
import { loginForm } from "./pages/login.js";
import { registerForm } from "./pages/register.js";
import { homePage } from "./pages/home.js";

import { header } from "./components/header.js";
import { errPage, badRequest } from "./components/err.js";

const root = document.getElementById("root");

if (!root) {
    throw new Error('Root not found');
}

function clearRoot() {
    root.innerHTML = "";
    root.innerHTML += header();
}

function renderLogin() {
    clearRoot();
    root.appendChild(loginForm());
}
function renderRegister(){
    clearRoot();
    root.appendChild(registerForm());
}

function renderErr(){
    clearRoot();
    root.innerHTML += errPage();
}

function renderBad(){
    clearRoot();
    root.innerHTML += badRequest();
}

function renderHome(){
    clearRoot();
    root.appendChild(homePage());
}

page('/', renderHome);
page('/login', renderLogin);
page('/signup', renderRegister);



page('/404', renderBad);
page('*', renderErr);

page.start();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-ajax]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('href');
            page(route);
        });
    });
});
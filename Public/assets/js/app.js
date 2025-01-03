import page from "page";
import { loginForm } from "./pages/login.js";
import { registerForm } from "./pages/register.js";
import { homePage } from "./pages/home.js";
import { projectsContainer } from "./pages/projects.js";

import { header } from "./components/header.js";
import { errPage, badRequest } from "./components/err.js";

import { getTasks } from "./stores/projects.js";

const root = document.getElementById("root");
const head = document.getElementById('header');

if (!root || !head) {
    throw new Error('Root not found');
}

head.appendChild(header());

function clearRoot() {
    root.innerHTML = "";
}

function renderLogin() {
    clearRoot();
    root.appendChild(loginForm());
}
function renderRegister() {
    clearRoot();
    root.appendChild(registerForm());
}

function renderErr() {
    clearRoot();
    root.innerHTML += errPage();
}

function renderBad() {
    clearRoot();
    root.innerHTML += badRequest();
}

function renderHome() {
    clearRoot();
    root.appendChild(homePage());
}

function renderProjects() {
    clearRoot();
    root.appendChild(projectsContainer());
    getTasks();
}

page('/', renderHome);
page('/login', renderLogin);
page('/signup', renderRegister);

page('/projects', renderProjects);

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
import page from "page";

import { loginForm } from "./pages/login.js";
import { registerForm } from "./pages/register.js";
import { homePage } from "./pages/home.js";
import { projectsContainer, porjectDetails } from "./pages/projects.js";

import { header } from "./components/header.js";
import { errPage, badRequest } from "./components/err.js";

import { getTasks } from "./stores/projects.js";
import { getProjectTasks } from "./stores/tasks.js";

import { isLogged } from "./utils/userUtil.js";

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
    if (isLogged()){
        page('/');
        return;
    }
    clearRoot();
    root.appendChild(loginForm());
}
function renderRegister() {
    if (isLogged()){
        page('/');
        return;
    }
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

function renderProjectDetails(ctx) {
    const { id } = ctx.params;
    clearRoot();
    root.appendChild(porjectDetails(id));
    getProjectTasks(id);
}

page('/', renderHome);
page('/login', renderLogin);
page('/signup', renderRegister);

page('/projects', renderProjects);
page('/projects/:id', (ctx) => {
    if (!isLogged()){
        page('/');
        return;
    }
    renderProjectDetails(ctx);
});

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
import page from "page";
import { header } from "./components/header.js";
import { loginForm } from "./components/login.js";

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

page('/', () => {
    clearRoot();
})

page('/login', renderLogin);

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
import page from "page";
import { loginForm, registerForm, homePage, projectsContainer, porjectDetails, statPage } from "./pages/index.js";
import { header } from "./components/header.js";
import { errPage, badRequest } from "./components/err.js";
import { getTasks, getProjectTasks } from "./stores/index.js";
import { isLogged } from "./utils/userUtil.js";

const root = document.getElementById("root");
const head = document.getElementById('header');

if (!root || !head) {
    throw new Error('Required DOM elements not found');
}

head.appendChild(header());

const requireAuth = (ctx, next) => {
    if (!isLogged()) {
        page.redirect('/login');
        return;
    }
    next();
};

const redirectIfLogged = (ctx, next) => {
    if (isLogged()) {
        page.redirect('/');
        return;
    }
    next();
};

const renderPage = (component, additionalAction = null) => {
    root.innerHTML = "";
    const element = typeof component === 'function' ? component() : component;
    root.appendChild(element);
    if (additionalAction) additionalAction();
};

const routes = {
    '/': () => renderPage(homePage),
    '/login': () => renderPage(loginForm),
    '/signup': () => renderPage(registerForm),
    '/projects': () => renderPage(projectsContainer, getTasks),
    '/projects/:id': (ctx) => renderPage(() => porjectDetails(ctx.params.id), () => getProjectTasks(ctx.params.id)),
    '/dashboard': () => renderPage(statPage),
    '/404': () => renderPage(badRequest),
    '*': () => renderPage(errPage)
};

page('/', routes['/']);
page('/login', redirectIfLogged, routes['/login']);
page('/signup', redirectIfLogged, routes['/signup']);
page('/projects', requireAuth, routes['/projects']);
page('/projects/:id', requireAuth, routes['/projects/:id']);
page('/dashboard', requireAuth, routes['/dashboard']);
page('/404', routes['/404']);
page('*', routes['*']);

page.start();

document.addEventListener('DOMContentLoaded', () => {
    const handleClick = (e) => {
        const link = e.target.closest('[data-ajax]');
        if (!link) return;
        
        e.preventDefault();
        page(link.getAttribute('href'));
    };

    document.body.addEventListener('click', handleClick);
});
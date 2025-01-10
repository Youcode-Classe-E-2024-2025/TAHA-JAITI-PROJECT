import page, { Context } from "page";
import renderPage from "./tools/renderPage";
import renderAsyncPage from "./tools/renderAsyncPage";
import { loginPage } from "./pages/loginPage";
import { registerPage } from "./pages/registerPage";
import { badRequest, errPage } from "./pages/errorPage";
import { homePage } from "./pages/homePage";
import { projectsContainer } from "./pages/projectsPage";
import tasksPage from "./pages/tasksPage";
import { checkTokenExpiration } from "./util/jwtDecode";
import logPage from "./pages/activityPage";
import getPermissions from "./util/getPerms";
import { statPage } from "./pages/statsPage";

const root = document.getElementById('root') as HTMLDivElement;

if (!root) {
    throw new Error('Root doesnt exist');
}

const checkAuth = (ctx: Context, next: () => void) => {
    const token = localStorage.getItem('token');

    if (!token) {
        page('/login');
    } else {
        next();
    }
};

const checkPermission = (permission: string) => (ctx: Context, next: () => void) => {
    const permissions = getPermissions();

    if (!permissions.includes(permission)) {
        page('/404');
    } else {
        next();
    }
};

const routes: Record<string, any> = {
    '/': () => renderPage(homePage),
    '/login': () => renderPage(loginPage),
    '/signup': () => renderPage(registerPage),
    '/projects': () => renderAsyncPage(projectsContainer),
    '/projects/:id': [checkAuth, (ctx: Context) => renderAsyncPage(tasksPage, ctx)],
    '/projects/:id/timeline': [checkAuth, checkPermission('create_task'), (ctx: Context) => renderAsyncPage(logPage, ctx)],
    '/projects/:id/stats': [checkAuth, checkPermission('create_task'), (ctx: Context) => renderAsyncPage(statPage, ctx)],
    '/404': () => renderPage(badRequest),
    '*': () => renderPage(errPage),
};

Object.entries(routes).forEach(([path, handle]) => {
    if (Array.isArray(handle)) {
        page(path, ...handle);
    } else {
        page(path, handle);
    }
});

page.start();

document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    const link = target.closest('[data-ajax]') as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute('href');
    if (href) {
        checkTokenExpiration();
        event.preventDefault();
        page(href);
    }
});
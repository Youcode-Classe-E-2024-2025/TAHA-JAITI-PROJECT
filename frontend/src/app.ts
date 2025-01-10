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

const root = document.getElementById('root') as HTMLDivElement;

if (!root) {
    throw new Error('Root doesnt exist');
}


const routes: Record<string, (ctx: Context) => void> = {
    '/': () => renderPage(homePage),
    '/login': () => renderPage(loginPage),
    '/signup': () => renderPage(registerPage),
    '/projects': () => renderAsyncPage(projectsContainer),
    '/projects/:id': (ctx) => renderAsyncPage(tasksPage, ctx),
    '/projects/:id/timeline': (ctx) => renderAsyncPage(logPage, ctx),
    '/404': () => renderPage(badRequest),
    '*': () => renderPage(errPage),
};

Object.entries(routes).forEach(([path, handle]) => page(path, handle));

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

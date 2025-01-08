import page from "page";
import renderPage from "./tools/renderPage";
import { loginPage } from "./pages/loginPage";

const root = document.getElementById('root') as HTMLDivElement;
const head = document.getElementById('head') as HTMLDivElement;

if (!root || head){
    throw new Error('Root doesnt exist');
}

const routes = {
    '/login': () => renderPage(loginPage)
}

page('/login', routes['/login']);

page.start();

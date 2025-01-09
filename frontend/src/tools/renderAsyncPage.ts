import { Context } from "page";
import Loading from "./loading";
import renderPage from "./renderPage";

const renderAsyncPage = async (getPage: (ctx?: Context) => Promise<HTMLElement>, ctx?: Context) => {
    Loading.start();

    try {
        // Pass `ctx` only if it exists
        const pageContent = await getPage(ctx);
        renderPage(() => pageContent);
    } catch (error) {
        console.error('Error rendering the page:', error);
        // Optionally, you can show an error page or message here
    } finally {
        Loading.stop();
    }
};

export default renderAsyncPage;

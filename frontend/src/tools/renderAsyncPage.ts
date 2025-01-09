import Loading from "./loading";
import renderPage from "./renderPage";
import { badRequest } from "@/pages/errorPage";

const renderAsyncPage = async (getPage: (ctx?: any) => Promise<HTMLElement>, ctx: any = null) => {
    Loading.start();
    
    try {
        const pageContent = await getPage(Number(ctx.params.id));
        renderPage(() => pageContent);
    } catch (error) {
        console.error("Error rendering page:", error);
        renderPage(() => badRequest());
    } finally {
        Loading.stop();
    }
};


export default renderAsyncPage;
import Loading from "./loading";
import renderPage from "./renderPage";

const renderAsyncPage = async (getPage: () => Promise<HTMLElement>) => {
    Loading.start();
    const pageContent = await getPage();
    renderPage(() => pageContent);
    Loading.stop();
};

export default renderAsyncPage;
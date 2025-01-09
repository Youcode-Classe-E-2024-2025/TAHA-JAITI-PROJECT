import renderPage from "./renderPage";

const renderAsyncPage = async (getPage: () => Promise<HTMLElement>) => {
    const pageContent = await getPage();
    renderPage(() => pageContent);
};

export default renderAsyncPage;
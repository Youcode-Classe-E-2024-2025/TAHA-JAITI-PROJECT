const root = document.getElementById('root');
if (!root) {
    throw new Error('Root doesnt exist');
}
const renderPage = (component, additionalAction = null) => {
    root.innerHTML = "";
    const element = typeof component === "function" ? component() : component;
    root.appendChild(element);
    if (additionalAction)
        additionalAction();
};
export default renderPage;

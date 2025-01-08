const root = document.getElementById('root') as HTMLDivElement;

if (!root) {
    throw new Error('Root doesnt exist');
}

const renderPage = (
    component: HTMLElement | (() => HTMLElement),
    additionalAction: (() => void) | null = null
): void => {
    root.innerHTML = "";

    const element = typeof component === "function" ? component() : component;

    root.appendChild(element);

    if (additionalAction) additionalAction();
};

export default renderPage;

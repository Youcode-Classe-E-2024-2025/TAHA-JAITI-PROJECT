export const errPage = () => {
    const elemenet = document.createElement('div');
    elemenet.className = 'h-full w-full flex justify-center items-center'
    elemenet.innerHTML = `<p class="text-3xl font-bold">404 :/ This page does not exist</p>`

    return elemenet;
};

export const badRequest = () => {
    const elemenet = document.createElement('div');
    elemenet.className = 'h-full w-full flex justify-center items-center'
    elemenet.innerHTML = `<p class="text-3xl font-bold">404 :/ A bad request happened, try again later :D</p>`

    return elemenet;
};
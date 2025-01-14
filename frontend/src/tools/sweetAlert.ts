import anime from "animejs";

const sweetAlert = (msg: string) => {
    const deja = document.querySelector('#alertMsg')
    if (deja){
        deja.remove();
    }

    const message = msg ? msg : 'none';

    const element = document.createElement('div')
    element.id = 'alertMsg'
    element.className = 'fixed left-1/2 w top-24 transform -translate-x-1/2 -translate-y-1/2 z-50'
    element.innerHTML = `<div class="bg-purple-950 w-full h-fit p-2 flex items-center rounded-sm">
                            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12c0-5.523-4.477-10-10-10S1 6.477 1 12s4.477 10 10 10 10-4.477 10-10z"></path>
                            </svg>
                            <p>${message}</p>
                        </div>`

    document.body.appendChild(element);

    element.style.transform = 'translateX(-50%)';

    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 500,
        easing: 'easeOutCubic'
    });

    setTimeout(() => {
        anime({
            targets: element,
            opacity: [1, 0],
            translateY: [0, 50],
            duration: 500,
            easing: 'easeInCubic',
            complete: () => element.remove()
        });
    }, 2500)
};

export default sweetAlert;
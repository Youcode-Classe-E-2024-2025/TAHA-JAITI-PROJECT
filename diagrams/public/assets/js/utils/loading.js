export const loading = function () {
    const element = document.createElement('div')
    element.className = 'fixed z-[100] inset-0 bg-black/50 h-screen w-screen flex items-center justify-center'
    element.id = "loadingOverlay";
    element. innerHTML = `<div class="spinner border-t-2 border-purple-400 rounded-full w-12 h-12 animate-spin"></div>`
    this.element = element;
};

loading.prototype.start = function () {
    document.body.appendChild(this.element);
}

loading.prototype.stop = function () {
    this.element.remove();
}
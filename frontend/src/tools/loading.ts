class Loading {
    private static element: HTMLElement;

    static init(): void {
        if (!this.element) {
            this.element = document.createElement('div');
            this.element.className = 'fixed z-[100] inset-0 bg-black/50 h-screen w-screen flex items-center justify-center';
            this.element.id = "loadingOverlay";
            this.element.innerHTML = `<div class="spinner border-t-2 border-purple-400 rounded-full w-12 h-12 animate-spin"></div>`;
        }
    }

    static start(): void {
        if (!this.element) {
            this.init(); 
        }
        document.body.appendChild(this.element);
    }

    static stop(): void {
        if (this.element) {
            this.element.remove();
        }
    }
}
export default Loading;
function on(event: string, callback: (event: Event) => void) {
    document.addEventListener(event, callback);
}

function off(event: string, callback: (event: Event) => void) {
    document.removeEventListener(event, callback);
}

function emit(event: string, detail: any) {
    document.dispatchEvent(new CustomEvent(event, { detail }));
}

export { on, off, emit };
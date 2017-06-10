import bus from './bus.js';
export default {
    show(text, time) {
            bus.$emit('loadingshow', { text: text, time: time });
        },
        hide() {
            bus.$emit('loadinghide');
        },
        on(evenName, fn) {
            bus.$on(evenName, event => fn(event));
        }
}

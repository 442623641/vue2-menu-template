import bus from './bus.js';
export default {
    open(obj) {
            bus.$emit('menuopen', obj);
        },
        close(obj) {
            bus.$emit('menuclose', obj);
        },
        on(evenName, fn) {
            bus.$on(evenName, event => fn(event));
        }

}

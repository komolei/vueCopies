import Vue from 'vue';
const bus = new Vue();
const use_bus = context => {
    bus.$emit("toast", context);
    setTimeout(() => {
        bus.$emit("toast_hidden", true);
    }, 500);
};
export {
    bus,
    use_bus
};
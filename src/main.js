// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App' //this is for web
// import router from './index_web'
// import store from './store/store';
import App from './App_mobile'
import router from './router/index_mobile';
import store from './store/store_mobile';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
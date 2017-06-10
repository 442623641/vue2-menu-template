// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Scroll from './components/scroll'
import View from './components/view'
/*
 *全局loading
 */
import Loading from './vuex/loading'
Vue.use(Loading)
Vue.prototype.$loading = Loading
    /*
     *全局http
     */
import http from './json'
Vue.use(http)
Vue.prototype.$http = http

Vue.config.productionTip = false
// Vue.use(Vview)
// Vue.use(Vview)
// Vue.use(loading)
//Vue.use(scroll)
/* eslint-disable no-new */
Vue.component('v-scroll',Scroll)
Vue.component('v-view',View)
new Vue({
    el: '#app',
    router,
    //store,
    template: '<App/>',
    components: { 
    	App
	 }
})

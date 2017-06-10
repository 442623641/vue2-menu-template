import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/views/home'
import About from '@/views/about'
import Fish from '@/views/fish'

Vue.use(Router)

export default new Router({
    mode: 'history', //'hash'则一切正常
    routes: [
        // {
        //   path: '/',
        //   name: 'home',
        //   component: Home
        // },
        {
            path: '/about',
            name: 'about',
            component: About
        }, {
            path: '/fish',
            name: 'fish',
            component: Fish
        },
        //    {
        //    path: '*',
        //    component: Home
        // }
    ]
})

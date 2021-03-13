import Vue from 'vue';
import VueRouter from "vue-router";
import store from './store'
import Login from "@/components/auth/Login";
import Home from "@/components/pages/Home";
import Lesson from "@/components/pages/Lesson";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import * as path from "path";

Vue.use(VueRouter);


export const router = new VueRouter({
    routes:[
        {
            path: '*',
            name: 'notFound',
            component: NotFoundComponent,
            meta: {
                requiresAuth : true,
                title : 'Böyle bir şey yok'
            }
        },
        {
            path : '/',
            component: Home,
            meta: {
                requiresAuth : true,
                title : 'Ana Sayfa'
            }

        },
        {
            path : '/login',
            component: Login,
            name : 'Login',
            meta: {
                title: 'Giriş',
                name : 'Giriş'
            }
        },
        {
            path : '/lesson',
            component: Lesson,
            props: true,
            name : 'Lesson',
            meta: {
                requiresAuth : true,
                title: 'Dersler'
            }
        }
        //{path : '', component: Login}
    ],
    mode: 'history' //varsayılan hash "linki arasında diyezi kaldırıyor"
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.

        if (!store.getters.isAuthenticated) { // burdan patlıyoruz
            console.log(" otontike kıksmı")
            next({
                path: '/login',
            })

        } else {
            console.log(" otontike else  kıksmı")
            next()
        }
    }else {
        console.log("require auth else  kıksmı")
        next()
    }
})

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title;
    });
});
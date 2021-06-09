import Vue from 'vue';
import VueRouter from "vue-router";
import store from './store'
import Login from "@/components/auth/Login";
import Home from "@/components/pages/Home";
Vue.use(VueRouter);


export const router = new VueRouter({
    routes:[
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
            path : '/lesson/:id',
            component: () => import("./components/pages/Lesson/Lesson"),
            props: true,
            name : 'Lesson',
            meta: {
                requiresAuth : true,
                title: 'Dersler'
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: () => import("./components/common/NotFoundComponent"),
            meta: {
                title : 'Böyle bir şey yok'
            }
        },
        {
            path: '/online_lesson',
            name: 'meet',
            component: () => import("./components/pages/Lesson/meet-jitsi"),
            meta: {
                title : 'Toplantı'
            }
        },
        {
            path: '/end',
            name: 'end',
            component: () => import("./components/pages/Lesson/OnlineLessonEnd"),
            meta: {
                title : 'Ders Bitti'
            }
        },
        //{path : '', component: Login}
    ],
    mode: 'hash' //varsayılan hash "linki arasında diyezi kaldırıyor"
});

router.beforeResolve((to, from, next) => {
    let isAuthenticated = localStorage.getItem("Access-Token");
    if (to.matched.some(r => r.meta.requiresAuth)) {
        if (isAuthenticated === '') {
            next({name: Login});
        } else {
            next();
        }
    } else {
        next({
            name: Login
        });
    }
})

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title;
    });
});
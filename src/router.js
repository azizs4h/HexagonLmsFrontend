import Vue from 'vue';
import VueRouter from "vue-router";
import store from './store'
import Login from "@/components/auth/Login";
import Home from "@/components/pages/Home";
import Lesson from "@/components/pages/Lesson";

Vue.use(VueRouter);


export const router = new VueRouter({
    routes:[
        {
            path : '/',
            component: Home,
            beforeEnter(to, from, next){
                // componente girmeden önce kontrol için bir metod
                if(store.getters.isAuthenticated){
                    next();
                }else{
                    next("/login");
                }
            }
        },
        {
            path : '/login',
            component: Login,
        },
        {
            path : '/lesson',
            component: Lesson,
            props: true,
            name : 'Lesson'
        }
        //{path : '', component: Login}
    ],
    mode: 'history' //varsayılan hash "linki arasında diyezi kaldırıyor"
});
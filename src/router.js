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
        //{path : '', component: Login}
        //{path : '', component: Login}
    ],
    mode: 'history' //varsayılan hash "linki arasında diyezi kaldırıyor"
});
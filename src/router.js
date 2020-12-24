import Vue from 'vue';
import VueRouter from "vue-router";

import Login from "@/components/auth/Login";
import Home from "@/components/pages/Home";

Vue.use(VueRouter);


export const router = new VueRouter({
    routes:[
        {path : '/', component: Home},
        {path : '/login', component: Login},
        //{path : '', component: Login}
        //{path : '', component: Login}
    ],
    mode: 'history' //varsayılan hash "linki arasında diyezi kaldırıyor"
});
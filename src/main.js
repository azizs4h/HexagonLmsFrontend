import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router"
import { routes } from "./routes" //değişken geleceği için kırlangıç içinde
Vue.config.productionTip = false


Vue.use(VueResource);
Vue.use(VueRouter);
// Base Url gelecek buraya
Vue.http.options.root = "http://localhost:8000/lmsApi";

const router = new VueRouter({
  routes,
  mode: 'history' //varsayılan hash "linki arasında diyezi kaldırıyor"
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

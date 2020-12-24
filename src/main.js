import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import vuetify from './plugins/vuetify';
import { router } from "./router" //değişken geleceği için kırlangıç içinde
Vue.config.productionTip = false


Vue.use(VueResource);
// Base Url gelecek buraya
Vue.http.options.root = "http://localhost:8000/lmsApi";



new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

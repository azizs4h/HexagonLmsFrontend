import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuelidate from "vuelidate/src";
import { router } from "./router" //değişken geleceği için kırlangıç içinde
import store from "./store"

Vue.config.productionTip = false


Vue.use(Vuelidate);


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

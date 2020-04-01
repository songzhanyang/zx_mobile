import Vue from 'vue';
import Routers from 'vue-router';
import routes from './router.js';
import store from './store.js';
import axios from 'axios';
import QS from 'qs';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/css/styleCom.css';
import 'lib-flexible';
import App from './App.vue'
Vue.use(Routers);

console.log(document.body.offsetHeight);
let _h = document.body.offsetHeight*0.3;
iView.Message.config({
  top: _h,
  duration: 2
})

Vue.use(iView);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
let router = new Routers({
  routes
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue';
import Vuex from 'vuex';
// import axios from './axios.js';
// import { Message } from 'iview';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        btnVar: "false",
        oneDataDet: {
            id: 0,
            current_pid: 0,
            total: 0,

        }
    },
    mutations: {
        checkoutTxt(state,value){
            state.btnVar = value;
        }
    },
    actions: {

    }
})
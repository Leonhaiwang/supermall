import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from './getter'
Vue.use(Vuex);

const state = {
  slideCount: 0,
  cartList: [],
  uid: ""
};
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;

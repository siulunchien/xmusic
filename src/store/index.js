import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import Play from './modules/Play';

export default new Vuex.Store({
  modules: {
    Play
  }
})
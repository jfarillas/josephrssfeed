import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  
  state: {
    user: {
      loggedIn: false	    
    }
  },
  
  mutations: {
    loggedIn (state, payload) {
      state.user.loggedIn = payload;
    }	  
  },

  actions: {
    loggedIn (context, payload) {
      context.commit('loggedIn', payload);
    }	  
  },

  getters: {
    loggedIn: state => {
      return state.user.loggedIn;
    }
  }

})

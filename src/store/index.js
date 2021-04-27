import { createStore } from 'vuex'

export default createStore({
  state: {
  	cards: [
  		{name: 'bender', imgName: 'icon-1.png', isActive: 'false'},
  		{name: 'gomer', imgName: 'icon-2.png', isActive: 'false'},
  		{name: 'scream', imgName: 'icon-3', isActive: 'false'},
  		{name: 'mario', imgName: 'icon-4.png', isActive: 'false'},
  	],
  	arrCards:['bender', 'mario','scream', 'gomer'],
    isFieldExist: false,
  },
  mutations: {
    CHANGE_EXISTING: (state, existing) => {
      state.isFieldExist = existing;
    }
  },
  actions: {
    CHANGE_IS_FIELD_EXIST({commit}, existing) {
      commit('CHANGE_EXISTING', existing)
    }
  },
  getters: {
  	CARDS(state) {
		return state.arrCards
  	},
    FIELD(state) {
      return state.isFieldExist
    }
  },
  modules: {
  }
})

export const state = () => ({
	listFavoriteProduct: [],
  })
  
  export const getters = {
	getListFavoriteProduct(state) {
		return state.listFavoriteProduct
	},
  }
  
  export const mutations = {
	updateListFavorite(state, data) {
	  state.listFavoriteProduct = data
	},
  }
  
  export const actions = {
	addFavoriteStore(vuexContext,data) {
		  vuexContext.commit('updateListFavorite', data)
	},
  }
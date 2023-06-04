export const state = () => ({
	listFavoriteProduct: [],
	listCategory: []
})

export const getters = {
	getListFavoriteProduct(state) {
		return state.listFavoriteProduct
	},
	getListCategory(state) {
		return state.listCategory
	}
}

export const mutations = {
	updateListFavorite(state, data) {
		state.listFavoriteProduct = data
	},
	updateListCategory(state, data) {
		state.listCategory = data
	}
}

export const actions = {
	addFavoriteStore(vuexContext, data) {
		vuexContext.commit('updateListFavorite', data)
	},
	addCategoryStore(vuexContext, data) {
		vuexContext.commit('updateListCategory', data)
	}

}
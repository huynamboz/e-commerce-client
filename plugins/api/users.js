export default (api) => ({
    getInfoMe: async()=>{
        return await api.get(`/users/me`);
    },
	getFavoriteProduct: async(page)=>{
		return await api.get(`/users/me/favorite-products?page=${page?page:1}`);
	},
	getUserById: async(id)=>{
		return await api.get(`/users/${id}`);
	},
	getReviewsOfUser: async(id)=>{
		return await api.get(`/users/${id}/reviews`);
	}
})
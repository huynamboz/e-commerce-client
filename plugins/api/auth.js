export default (api) => ({
	getUserById: async (idUser) => {
		return await api.get(`auth/user/${idUser}`);
	},
})
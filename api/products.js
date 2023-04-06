export default (haveToken, noneToken) => ({
    getProductById: async(idProduct)=>{
        return await noneToken.get(`/products/${idProduct}`);
    },
	getAllProduct: async(page)=>{
		return await noneToken.get(`/products?page=${page?page:1}`);
	},
	getAllCategory: async()=>{
		return await noneToken.get("https://635d4fb7cb6cf98e56b20ae8.mockapi.io/api/listpost/product");
	}
})
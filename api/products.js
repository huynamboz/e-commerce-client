export default (api) => ({
    getProductById: async(idProduct)=>{
        return await api.get(`/products/${idProduct}`);
    },
	getAllProduct: async(page)=>{
		return await api.get(`/products?page=${page?page:1}`);
	},
	addNewProduct: async(product)=>{
		return await api.post("/products/my-products", product);
	},
	uploadImage: async(file)=>{
		return await api.post("/upload", file);
	},
	searchProduct: async(keyword, page = 1)=>{
		return await api.get(`/products/search?name=${keyword}&page=${page}`);
	},
	getAllCategory: async()=>{
		return await api.get("https://635d4fb7cb6cf98e56b20ae8.mockapi.io/api/listpost/product");
	}
})
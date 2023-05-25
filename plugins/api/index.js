import Product from "./products";
import Auth from "./auth";
import apiToken from './apiHaveToken';
import User from "./users";
export default (context, inject, store) => {
	inject("api", {
		products: Product(apiToken),
		auth: Auth(apiToken),
		users: User(apiToken),
	});
};

import Product from "~/api/products";
import Auth from "~/api/auth";
import apiToken from './apiHaveToken';
import User from "~/api/users";
export default (context, inject, store) => {
	inject("api", {
		products: Product(apiToken),
		auth: Auth(apiToken),
		users: User(apiToken),
	});
};

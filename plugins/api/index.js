import Product from "./products";
import Auth from "./auth";
import User from "./users";
import axios from 'axios'
export default (context, inject, store) => {
	// init axios instance
	const instance = axios.create({
		baseURL: process.env.BASE_URL_API,
		headers: {
			common: {
				'Content-Type': 'application/json',
			},
		},
	});

	// set token for axios instance
	instance.interceptors.request.use(
		config => {
			const token = localStorage.getItem('auth._token.local');
			if (token) {
				config.headers['Authorization'] = token;
			}
				return config;
			},
		error => {
				return Promise.reject(error);
			}
		);
	inject("api", {
		products: Product(instance),
		auth: Auth(instance),
		users: User(instance),
	});
};

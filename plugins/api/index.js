import Product from "./products";
import Auth from "./auth";
import User from "./users";
import axios from 'axios';
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

	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			const statusCode = error.response.status;
			console.log("call api author",error.response);
			// Kiểm tra nếu mã lỗi là 401
			if (statusCode === 401) {
				// Gọi hàm refresh token
				try {
					await store.$auth.refreshTokens();
					// Thực hiện lại yêu cầu API gốc sau khi refresh token thành công
					return instance(error.config);
				} catch (error) {
					// Xử lý lỗi khi refresh token không thành công
					// Ví dụ: đăng xuất người dùng, chuyển hướng đến trang đăng nhập, ...
					// console.log('Refresh token failed:', error);
				}
			}

			// Nếu không phải mã lỗi 401, trả về lỗi gốc
			return Promise.reject(error);
		}
	);
	inject("api", {
		products: Product(instance),
		auth: Auth(instance),
		users: User(instance),
	});
};

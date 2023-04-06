import Product from "~/api/products";
import Auth from "~/api/auth";
import apiNone from './apiNoneToken';
import apiToken from './apiHaveToken';

export default (context, inject, store) => {
  // Initialize API factories
  const factories = {
    products: Product(apiToken, apiNone),
	auth: Auth(apiToken, apiNone),
  };

  // Inject $api
  inject("api", factories);
};

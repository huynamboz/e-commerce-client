const axios = require("axios").default;

const instance = axios.create({
  baseURL: process.env.BASE_URL_API,
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.interceptors.request.use(
  (request) => {
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    if (
      [
        "ERR.TOK0101",
        "ERR.TOK0103",
        "ERR.TOK0201",
        "ERR.TOK0202",
        "ERR.TOK0203",
      ].includes(error.response?.data?.error?.code ?? "")
    ) {
      redirect(app.localPath("/"));
    }
    return Promise.reject(error);
  }
);

export default instance;
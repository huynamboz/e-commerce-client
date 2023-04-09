const axios = require("axios").default;

const instance = axios.create({
  baseURL: process.env.BASE_URL_API,
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.interceptors.request.use(
  (request) => {
    console.log("making request", request);
    if(request.url.includes('null') || request.url.includes('undefined') || request.url.includes('//')) {
      return Promise.reject("NOT REQUEST");
    }
    const itemAuthLocal = localStorage.getItem("auth._token.local") ?? null;
    if(itemAuthLocal){
      request.headers["Authorization"] = localStorage.getItem("auth._token.local");
    }
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
        "ERR.TOK0102"
      ].includes(error.response?.data?.error?.code ?? "")
    ) {
      redirect(app.localPath("/"));
    }
    return Promise.reject(error);
  }
);

export default instance;



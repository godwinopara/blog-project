import axios from "axios";

const baseUrl = "/api/blogs";

const getToken = () => {
	const userToken = JSON.parse(localStorage.getItem("userToken"));
	return userToken?.token ?? "";
};

axios.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.status === 401) {
			localStorage.removeItem("userToken");
		}
		return Promise.reject(error);
	}
);

const getAll = async () => {
	const getData = await axios.get(baseUrl);
	const data = await getData.data;
	return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };

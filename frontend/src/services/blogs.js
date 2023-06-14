import axios from "axios";

const baseUrl = "/api/blogs";

let AUTH_TOKEN = null;

const setToken = (newToken) => {
	AUTH_TOKEN = `Bearer ${newToken}`;
};

const getAll = async (token) => {
	const request = await axios.get(baseUrl, { headers: { Authorization: `Bearer ${token}` } });
	const response = await request.data;
	return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, AUTH_TOKEN };

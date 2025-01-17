import axios from "axios";
import { useCookies } from "react-cookie";

type TContentType = "application/json" | "multipart/form-data";

const useAxios = (contentType: TContentType = "application/json") => {
	const [cookies] = useCookies(["refreshToken"]);
	const { refreshToken } = cookies;

	const axiosClient = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Cache-Control": "no-cache",
			"Content-Type": contentType,
			"x-rftk": refreshToken,
		},
	});

	return axiosClient;
};

export default useAxios;

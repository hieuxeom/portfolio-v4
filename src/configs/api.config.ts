const baseURL = import.meta.env.VITE_BASE_URL;

const API_ROUTE = {
	PROJECT: {
		GET_ALL: "/projects",
		GET_ONE: (projectId: string) => `/projects/${projectId}`,
		NEW: "/projects",
	},
};

export default API_ROUTE;

const baseURL = import.meta.env.VITE_BASE_URL;

const API_ROUTE = {
	PROJECT: {
		GET_ALL: "/projects",
		GET_ONE: (projectId: string | number) => `/projects/${projectId}`,
		NEW: "/projects",
		UPDATE: (projectId: string | number) => `/projects/${projectId}`,
		DELETE: (projectId: string | number) => `/projects/${projectId}`,
	},
};

export default API_ROUTE;

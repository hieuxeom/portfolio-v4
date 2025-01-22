const baseURL = import.meta.env.VITE_BASE_URL;

const API_ROUTE = {
	PROJECT: {
		GET_ALL: "/projects",
		GET_ONE: (projectId: string | number) => `/projects/${projectId}`,
		NEW: "/projects",
		UPDATE: (projectId: string | number) => `/projects/${projectId}`,
		DELETE: (projectId: string | number) => `/projects/${projectId}`,
	},
	EDUCATION: {
		GET_ALL: "/education",
		GET_ONE: (educationId: string | number) => `/education/${educationId}`,
		NEW: "/education",
		UPDATE: (educationId: string | number) => `/education/${educationId}`,
		SOFT_DELETE: (educationId: string | number) => `/education/${educationId}/delete`,
		RECOVER: (educationId: string | number) => `/education/${educationId}/recover`,
		PERMANENT_DELETE: (educationId: string | number) => `/education/${educationId}`,
	},
};

export default API_ROUTE;

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
	CERTIFICATION: {
		GET_ALL: "/certification",
		GET_ONE: (certId: string | number) => `/certification/${certId}`,
		NEW: "/certification",
		UPDATE: (certId: string | number) => `/certification/${certId}`,
		SOFT_DELETE: (certId: string | number) => `/certification/${certId}/delete`,
		RECOVER: (certId: string | number) => `/certification/${certId}/recover`,
		PERMANENT_DELETE: (certId: string | number) => `/certification/${certId}`,
	},
	EMPLOYMENT: {
		GET_ALL: "/employment",
		GET_ONE: (employmentId: string | number) => `/employment/${employmentId}`,
		NEW: "/employment",
		UPDATE: (employmentId: string | number) => `/employment/${employmentId}`,
		SOFT_DELETE: (employmentId: string | number) => `/employment/${employmentId}/delete`,
		RECOVER: (employmentId: string | number) => `/employment/${employmentId}/recover`,
		PERMANENT_DELETE: (employmentId: string | number) => `/employment/${employmentId}`,
	},
};

export default API_ROUTE;

const ROUTE_PATH = {
	ADMIN: {
		DASHBOARD: {
			INDEX: "/admin/dashboard",
		},
		ACCOUNT: {
			INDEX: "/admin/accounts",
		},
		EDUCATION: {
			INDEX: "/admin/education",
			NEW: "/admin/education/new",
		},
		CERTIFICATION: {
			INDEX: "/admin/certification",
			NEW: "/admin/certification/new",
		},
		EMPLOYMENT: {
			INDEX: "/admin/employment",
			NEW: "/admin/employment/new",
		},
		PROJECT: {
			INDEX: "/admin/projects",
			NEW: "/admin/projects/new",
			DETAILS: (projectId: string | number) => `/admin/projects/${projectId}`,
			EDIT: (projectId: string | number) => `/admin/projects/${projectId}/edit`,
		},
	},
	CLIENT: {
		PROJECT: {
			INDEX: "/projects",
			DETAILS: (projectId: string | number) => `/projects/${projectId}`,
		},
	},
};

export default ROUTE_PATH;

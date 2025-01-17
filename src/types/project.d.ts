export type TProject = {
	id: string;
	project_fullname: string;
	project_shortname: string;
	start_date: string;
	end_date: string;
	short_description: string;
	project_thumbnail: string;
	article_body: string;
	created_at: string;
	updated_at: string;
	is_deleted: boolean;
};

export type TNewProject = Pick<
	TProject,
	"project_fullname" | "project_shortname" | "start_date" | "end_date" | "short_description" | "article_body"
> & {
	project_thumbnail: FileList | null;
};

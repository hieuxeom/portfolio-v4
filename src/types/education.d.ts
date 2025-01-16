export type TEducation = {
	id: string;
	title: string;
	organization: string;
	time_start: string;
	time_end: string;
	created_at: string;
	updated_at: string;
	is_deleted: boolean;
};

export type TNewEducation = Pick<TEducation, "title" | "organization" | "time_start" | "time_end">;

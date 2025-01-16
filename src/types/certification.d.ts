export type TCertificate = {
	id: string;
	title: string;
	issued_by: string;
	issued_date: string;
	img_path: string;
	created_at: string;
	updated_at: string;
	is_deleted: boolean;
};

export type TNewCertification = Pick<TCertificate, "title" | "issued_by" | "issued_date" | "img_path">;

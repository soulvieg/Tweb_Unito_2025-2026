export type NewsType = {
	id: number;
	title: string;
	content: string;
	description: string;
	img: string;
	published_at: Date;
	src: string;
	location: string;
	// author: number;
};

export type CreateNewsType = Pick<
	NewsType,
	| "title"
	| "content"
	| "description"
	| "img"
	| "src"
	| "location"
	| "published_at"
>;

export type RoleType = "admin" | "user";

export type UserType = {
	u_id: number;
	username: string;
	password: string;
	role: RoleType;
};
export type CreateUserType = Pick<UserType, "username" | "password" | "role">;

export type PostType = {
	p_id: number;
	u_id: number;
	title: string;
	text: string;
	creation_date: Date;
	author: number;
	replies_count: number;
};

export type CreatePostType = Pick<PostType, "u_id" | "title" | "text">;

export type CommentType = {
	c_id: number;
	p_id: number;
	u_id: number;
	text: string;
	creation_date: Date;
};

export type CreateCommentType = Pick<CommentType, "p_id" | "u_id" | "text">;

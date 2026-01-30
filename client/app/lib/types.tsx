export type DatabaseType<T, CreateT> = {
	getAll: () => Promise<T[]>;
	getOne: (id: number) => Promise<T>;
	create: (data: CreateT) => Promise<T>;
	update: (id: number, data: Partial<CreateT>) => Promise<T>;
	delete: (id: number) => Promise<void>;
};

export type CategoryType = {
	categoryId: number;
	categoryName: string;
};

export type NewsType = {
	newsId: number;
	title: string;
	content: string;
	description: string;
	img: string;
	published_at: Date;
	src: string;
	location: string;
	categoryId: number;
	// author: number;
};

export type CreateNewsType = Pick<
	NewsType,
	"title" | "content" | "description" | "img" | "src" | "location"
>;

export type RoleType = "admin" | "user";

export type UserType = {
	userId: number;
	username: string;
	role: RoleType;
};

export type LoginType = {
	username: string;
	password: string;
};
export type SingupType = {
	username: string;
	password: string;
	checkPassword: string;
};

export type PostType = {
	postId: number;
	title: string;
	text: string;
	creationDate: Date;
	author: number;
	repliesCount: number;
};
export type CreatePostType = Pick<PostType, "author" | "title" | "text">;

export type ReportType = {
	reportId: number;
	reason: string;
	createdAt: string;
	commentId: number;
	reporterId: number;
};
export type CreateReportType = Pick<
	ReportType,
	"reason" | "reporterId" | "commentId"
>;

export type CommentType = {
	commentId: number;
	postId: number;
	author: number;
	text: string;
	creationDate: Date;
	muted: boolean;
};

export type CreateCommentType = Pick<CommentType, "postId" | "author" | "text">;

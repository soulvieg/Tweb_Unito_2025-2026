export const queriesKeys = {
	news: {
		all: ["news"] as const,
		single: (id: number) => [queriesKeys.news.all, id] as const,
	} as const,
	posts: {
		all: ["posts"] as const,
		single: (id: number) => [queriesKeys.posts.all, id] as const,
	} as const,
	comments: {
		all: ["comments"] as const,
		single: (id: number) => [queriesKeys.comments.all, id] as const,
	} as const,
	users: {
		all: ["users"] as const,
		single: (id: number) => [queriesKeys.users.all, id] as const,
	} as const,
	reports: {
		all: ["reports"] as const,
	} as const,
	categories: {
		all: ["categories"] as const,
		single: (id: number) => [queriesKeys.categories.all, id] as const,
	} as const,
	login: ["auth", "login"] as const,
	singup: ["auth", "singup"] as const,
};

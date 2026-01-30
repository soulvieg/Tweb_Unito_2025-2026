import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("./layouts/MainLayout.tsx", [
		index("routes/home.tsx"),
		route("forum", "routes/Forum.tsx"),
		route("forum/:id", "routes/ForumDetails.tsx"),

		route("news", "routes/News.tsx"),
		route("news/:id", "routes/NewsDetails.tsx"),

		route("about", "routes/About.tsx"),
		route("auth", "routes/AuthPage.tsx"),
		route("*", "routes/NotFound.tsx"),
	]),
] satisfies RouteConfig;

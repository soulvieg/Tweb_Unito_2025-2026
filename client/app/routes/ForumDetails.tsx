import React from "react";
import { useParams } from "react-router";

export default function ForumDetails() {
	const { id } = useParams();
	const isLoading = false;
	//const article = palestinianNews.find((article) => article.id === id);
	return <div>ForumDetails</div>;
}

import React from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function MainLayout() {
	const location = useLocation();
	return (
		<>
			<Header />
			<main
				className="animate-fade-in bg-black text-foreground antialiased selection:bg-primary/10 font-body"
				key={"main_layout_" + location.pathname}
			>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

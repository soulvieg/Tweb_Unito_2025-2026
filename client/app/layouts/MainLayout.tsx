import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const queryClient = new QueryClient();

export default function MainLayout() {
	const location = useLocation();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Header />
				<main
					className="animate-fade-in-up bg-black text-foreground antialiased selection:bg-primary/10 font-body"
					key={"main_layout_" + location.pathname}
					onAnimationEnd={(e) => {
						//per far funzionare il modal senza problemi di trasform e animazione
						e.currentTarget.style.transform = "none";
						e.currentTarget.style.animation = "none";
					}}
				>
					<Outlet />
				</main>
				<Footer />
			</QueryClientProvider>
		</>
	);
}

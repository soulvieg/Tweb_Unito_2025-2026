import React from "react";
import { Link } from "react-router";
import Button from "./ui/Button";
import { MessageSquare, Newspaper } from "lucide-react";

export default function Hero() {
	return (
		<>
			<div className="container mx-auto px-4 py-20 md:py-32 relative z-10 ">
				<div className="max-w-3xl">
					<div className="inline-block px-4 py-2 bg-primary text-background text-sm font-bold mb-6 border-2 border-secondary">
						RAW. DIRECT. UNCENSORED.
					</div>
					<h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6">
						WHAT THEY DON'T TELL YOU <br />
						<span className="text-primary">ABOUT PALESTINE</span>
					</h1>
					<p className="text-lg text-foreground mb-8 max-w-2xl leading-relaxed font-ibm text-gray-300">
						Cut through the noise. Unfiltered facts. Real stories.
						Real voices. A platform where the truth matters and
						dialogue shapes understanding.
					</p>
					<div className="flex flex-wrap gap-4">
						<Link to="/news">
							<Button
								size="lg"
								className="h-12 px-8 text-base font-bold border-2 border-primary"
							>
								<Newspaper className="w-4 h-4" />
								BREAKING NEWS
							</Button>
						</Link>
						<Link to="/forum">
							<Button
								variant="outline"
								size="lg"
								className="h-12 px-8 text-base gap-2 bg-primary text-background font-bold border-2 border-primary "
							>
								<MessageSquare className="w-4 h-4" />
								SPEAK UP
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

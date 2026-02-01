import { Globe } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function Footer() {
	return (
		<footer className="border-t bg-secondary-foreground">
			<div className="container mx-auto px-4 py-8 md:py-12">
				<div className="">
					<div className="md:col-span-1">
						<div className="flex items-center space-x-2 mb-4">
							<Globe className="h-5 w-5 text-primary" />
							<span className="font-display font-bold text-lg text-white">
								R.D.U.
							</span>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Providing neutral, factual coverage and fostering
							respectful dialogue on complex regional issues.
						</p>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
					© {new Date().getFullYear()} R.D.U. All rights reserved.
				</div>
			</div>
		</footer>
	);
}

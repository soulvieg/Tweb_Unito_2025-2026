import { Globe } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function Footer() {
	return (
		<footer className="border-t bg-secondary-foreground">
			<div className="container mx-auto px-4 py-8 md:py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="md:col-span-1">
						<div className="flex items-center space-x-2 mb-4">
							<Globe className="h-5 w-5 text-primary" />
							<span className="font-display font-bold text-lg text-white">
								Observer
							</span>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Providing neutral, factual coverage and fostering
							respectful dialogue on complex regional issues.
						</p>
					</div>

					<div>
						<h3 className="font-semibold mb-4 text-white">
							Sections
						</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link
									to="/news"
									className="hover:text-foreground "
								>
									Latest News
								</Link>
							</li>
							<li>
								<Link
									to="/forum"
									className="hover:text-foreground"
								>
									Community Forum
								</Link>
							</li>
							<li>
								<Link
									to="/analysis"
									className="hover:text-foreground"
								>
									Analysis
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold mb-4 text-white">Legal</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link
									to="/privacy"
									className="hover:text-foreground"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/terms"
									className="hover:text-foreground"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									to="/cookies"
									className="hover:text-foreground"
								>
									Cookie Policy
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold mb-4 text-white">
							Connect
						</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<a href="#" className="hover:text-foreground">
									Twitter
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-foreground">
									Facebook
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-foreground">
									Contact Us
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
					© {new Date().getFullYear()} Observer News. All rights
					reserved.
				</div>
			</div>
		</footer>
	);
}

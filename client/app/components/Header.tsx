import React from "react";
import { Link, useLocation } from "react-router";
import Button from "./ui/Button";
import { cn } from "~/lib/utils";
import { Globe } from "lucide-react";

type NavItemType = {
	to: string;
	label: string;
};
const navItems: NavItemType[] = [
	{ to: "/", label: "Home" },
	{ to: "/news", label: "News" },
	{ to: "/forum", label: "Forum" },
	{ to: "/about", label: "About" },
];

export default function Header() {
	const location = useLocation();
	return (
		<header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-background font-body">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link
					to="/"
					className="flex items-center space-x-3 transition-transform hover:opacity-75"
				>
					<Globe className="h-6 w-6 text-primary" />
					<span className="font-display font-black text-xl tracking-tight text-primary">
						R.D.U.
					</span>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center space-x-6">
					{navItems.map((item) => (
						<HeaderLink
							item={item}
							isCurrent={location.pathname === item.to}
						/>
					))}
					<Button>Subscribe</Button>
				</nav>

				{/* Mobile Nav */}
				{/* <div className="md:hidden">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<div className="flex flex-col space-y-4 mt-8">
								{navItems.map((item) => (
									<Link
										key={item.to}
										to={item.to}
										className={cn(
											"text-lg font-medium transition-colors hover:text-primary",
											location === item.to
												? "text-primary"
												: "text-muted-foreground"
										)}
										onClick={() => setIsOpen(false)}
									>
										{item.label}
									</Link>
								))}
								<Button className="w-full mt-4">
									Subscribe
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div> */}
			</div>
		</header>
	);
}

function HeaderLink({
	item,
	isCurrent,
}: {
	item: NavItemType;
	isCurrent: boolean;
}) {
	return (
		<Link
			key={item.to}
			to={item.to}
			className={cn(
				"relative text-sm font-medium transition-colors hover:text-primary",
				"after:absolute after:bg-primary after:h-px after:w-0 hover:after:w-full after:bottom-0 after:left-0 after:transition-all",
				isCurrent
					? "text-primary after:w-full"
					: "text-muted-foreground"
			)}
		>
			{item.label}
		</Link>
	);
}

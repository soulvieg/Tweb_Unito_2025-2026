import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "./ui/Button";
import { cn } from "~/lib/utils";
import { Globe, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "~/contexts/AuthContext";
import Dialog, { useDialogControl } from "./ui/Dialog";
import AuthPage from "~/routes/AuthPage";

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
	const navigate = useNavigate();
	const { user, logout, isPending } = useAuth();
	const { isOpen, onOpen, onClose } = useDialogControl();
	return (
		<>
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
								isCurrent={
									"/" + location.pathname.split("/")[1] ===
									item.to
								}
							/>
						))}
						{user !== null ? (
							<>
								<div className="text-white flex gap-2 items-center justify-center">
									<User className="size-5 rounded-full  border border-gray-400" />{" "}
									{user?.username ?? "Guest"}
								</div>

								<LogOut
									onClick={() => logout()}
									className="text-primary cursor-pointer"
								/>
							</>
						) : (
							<>
								<Button
									onClick={() => {
										console.log("ciaoo");
										onOpen();
									}}
								>
									Login
								</Button>
							</>
						)}
					</nav>
					{!user ? (
						<Dialog isOpen={isOpen} onClose={onClose} title="">
							<AuthPage />
						</Dialog>
					) : null}

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
			<div className="md:hidden w-screen">
				<div className="fixed bottom-0 w-full flex gap-2 h-[20px] max-w-screen mb-5 rounded-xl px-2 py-6 text-lg justify-evenly items-center z-800 bg-accent-foreground border border-accent">
					{navItems.map((item) => (
						<HeaderLink
							item={item}
							isCurrent={location.pathname === item.to}
						/>
					))}

					{user !== null ? (
						<>
							<LogOut
								onClick={() => logout()}
								className="text-primary cursor-pointer"
							/>
						</>
					) : (
						<>
							<LogIn
								onClick={() => {
									console.log("ciaoo");
									onOpen();
								}}
								className="text-primary cursor-pointer"
							/>
						</>
					)}
				</div>
			</div>
		</>
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
					: "text-muted-foreground",
			)}
		>
			{item.label}
		</Link>
	);
}

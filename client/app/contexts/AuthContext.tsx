import React, {
	createContext,
	useState,
	useContext,
	type JSX,
	use,
} from "react";
import type { RoleType, LoginType, UserType } from "../lib/types";
import { useMutation } from "@tanstack/react-query";
import { queries } from "~/lib/Api/api";
import useLocaleState from "../hooks/useLocaleState";
import { useNavigate } from "react-router";
import { useToast } from "./ToastContext";
import type { AxiosError } from "axios";
import { errorCheck } from "~/lib/utils";

interface AuthContextType {
	user: UserType | null;
	login: (userData: LoginType) => void;
	logout: () => void;
	isPending: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	login: (userData: LoginType) => {},
	logout: () => {},
	isPending: false,
});

const users = [
	{
		u_id: 0,
		username: "admin",
		password: "admin123",
		role: "admin" as RoleType,
	},
	{
		u_id: 0,
		username: "rebel",
		password: "rebel123",
		role: "user" as RoleType,
	},
];

export function AuthProvider({ children }: { children: JSX.Element }) {
	const [user, setUser] = useLocaleState<UserType | null>({
		key: "user",
		defaultValue: null,
	});
	const { toast } = useToast();

	const { mutate: login, isPending } = useMutation({
		...queries.auth.login,
		onSuccess: (data) => {
			const user = (data as any).user;
			if (user) {
				console.log(user);
				setUser({
					userId: user.userId,
					username: user.username,
					role: user.role,
				});
				toast.success({
					message: "Welcome " + user.username,
				});
			}
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, "Invalid username or password");
		},
	});

	// const handleLogin = (userData: UserLogin) => {
	// 	login(userData, {
	// 		onSuccess: (data) => {
	// 			setUser(data);
	// 		},
	// 		onError: (error) => {
	// 			console.error("Login failed:", error);
	// 		},
	// 	});
	// };

	// const handleLogin = (userData: UserLogin) => {
	// 	const user = users.find(
	// 		(u) =>
	// 			u.username === userData.username &&
	// 			u.password === userData.password,
	// 	);
	// 	login(userData);
	// 	if (user) {
	// 		setUser({
	// 			userId: user.u_id,
	// 			username: user.username,
	// 			role: user.role,
	// 		});
	// 		// navigate("/");
	// 	}
	// };

	const logout = () => {
		location.reload();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isPending }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	return context;
};

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button, { MutateButton } from "~/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { FieldInput } from "~/components/ui/Field";
import { Input } from "~/components/ui/Input";
import { Tab, Tabs } from "~/components/ui/Tabs";
import { useAuth } from "~/contexts/AuthContext";
import { useToast } from "~/contexts/ToastContext";
import useForm, { type ErrorFormType } from "~/hooks/useForm";
import { queries } from "~/lib/Api/api";
import type { LoginType, SingupType } from "~/lib/types";
import { errorCheck, validateRequired } from "~/lib/utils";

export default function AuthPage() {
	return (
		<>
			{/* <div className="container mx-auto px-4 py-20 flex justify-center"> */}
			<Card className="w-full max-w-md border-2 border-primary">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl font-black text-primary uppercase">
						Join the Resistance
					</CardTitle>
					<div className="font-mono">
						Hardcoded accounts: admin/admin123 or rebel/rebel123
					</div>
				</CardHeader>
				<CardContent>
					<Tabs>
						<Tab label="Login">
							<LoginForm />
						</Tab>
						<Tab label="Register">
							<SignupForm />
						</Tab>
					</Tabs>
				</CardContent>
			</Card>
			{/* </div> */}
		</>
	);
}

function LoginForm() {
	const controls = useForm<LoginType>({
		username: "",
		password: "",
	});

	const { login, isPending } = useAuth();

	const validate = (s: LoginType) => {
		const errors: ErrorFormType<LoginType> = {};
		validateRequired(s, errors, ["password", "username"]);
		controls.setErrors(errors);
		return errors;
	};

	return (
		<>
			<div className="space-y-2">
				<FieldInput
					label="Username"
					id="username"
					{...controls}
					placeholder="admin or rebel"
					className="border-primary/50"
				/>
			</div>
			<div className="space-y-2">
				<FieldInput
					label="Password"
					id="password"
					type="password"
					{...controls}
					className="border-primary/50"
				/>
			</div>
			<div className="grid grid-cols-2 gap-4 pt-4">
				<MutateButton
					isPending={isPending}
					onClick={() => {
						const errors = validate(controls.state);

						if (Object.keys(errors).length === 0)
							login({
								username: controls.state.username,
								password: controls.state.password,
							});
					}}
					className="font-bold border-2 border-primary"
				>
					LOGIN
				</MutateButton>
			</div>
		</>
	);
}

function SignupForm() {
	const controls = useForm<SingupType>({
		username: "",
		password: "",
		checkPassword: "",
	});

	const validate = (s: SingupType) => {
		const errors: ErrorFormType<SingupType> = {};

		if (s.password.trim().length < 6) {
			errors["password"] = "Min length is 6";
		}
		if (s.checkPassword !== s.password) {
			errors["checkPassword"] = "Doesn't correspond to password";
		}
		validateRequired(s, errors, ["password", "username"]);
		controls.setErrors(errors);
		return errors;
	};
	const { toast } = useToast();
	const { login } = useAuth();
	const { mutate: signup, isPending } = useMutation({
		...queries.auth.signup,
		onSuccess: (data) => {
			toast.success({
				message: "successfully signed up",
			});
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, e.cause as string);
		},
	});

	return (
		<>
			<div className="space-y-2">
				<FieldInput
					label="Username"
					id="username"
					{...controls}
					placeholder="admin or rebel"
					className="border-primary/50"
				/>
			</div>
			<div className="space-y-2">
				<FieldInput
					label="Password"
					id="password"
					type="password"
					{...controls}
					className="border-primary/50"
				/>
			</div>
			<div className="space-y-2">
				<FieldInput
					label="Repeat password"
					id="checkPassword"
					type="password"
					{...controls}
					className="border-primary/50"
				/>
			</div>
			<div className="grid grid-cols-2 gap-4 pt-4">
				<MutateButton
					isPending={isPending}
					onClick={() => {
						const errors = validate(controls.state);

						if (Object.keys(errors).length === 0)
							signup({
								username: controls.state.username,
								password: controls.state.password,
							});
					}}
					className="font-bold border-2 border-primary"
				>
					SINGUP
				</MutateButton>
			</div>
		</>
	);
}

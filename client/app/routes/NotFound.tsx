import { AlertCircle } from "lucide-react";
import React from "react";
import { Card, CardContent } from "~/components/ui/Card";

export default function NotFound() {
	return (
		<div className="min-h-[60vh] w-full flex items-center justify-center ">
			<Card className="w-full max-w-md mx-4">
				<CardContent className="pt-6">
					<div className="flex gap-2">
						<AlertCircle className="h-8 w-8 text-red-500" />
						<h1 className="text-2xl font-bold ">
							404 Page Not Found
						</h1>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

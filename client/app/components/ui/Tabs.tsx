import React, { useState, type ReactElement, type ReactNode } from "react";
import { cn } from "~/lib/utils";

// Define the props for the individual Tab
interface TabProps {
	label: string;
	children: ReactNode;
}

// Define the props for the main Container
interface TabsProps {
	children: ReactElement<TabProps>[]; // Enforces that children must be Tab components
}

// 1. The Individual Tab (Placeholder for data)
export function Tab({ children }: TabProps) {
	return <>{children}</>;
}

// 2. The Main Tabs Container
export function Tabs({ children }: TabsProps) {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="w-full max-w-2xl mx-auto">
			<div className="flex border-b border-gray-200">
				{children.map((child, index) => {
					const isActive = index === activeTab;

					return (
						<button
							key={index}
							onClick={() => setActiveTab(index)}
							className={cn(
								"flex-1 py-3 text-center font-medium text-sm transition-all duration-300 focus:outline-none cursor-pointer rounded-t-lg",
								isActive
									? "border-b-2 border-primary text-white bg-blue-50/50 "
									: "text-gray-500  "
							)}
						>
							{child.props.label}
						</button>
					);
				})}
			</div>

			<div className="p-6  border border-t-0 border-gray-200 rounded-b-lg shadow-sm animate-fade-in-up">
				<div
					key={"activeTab" + activeTab}
					className="animate-fade-in-up"
				>
					{children[activeTab]}
				</div>
			</div>
		</div>
	);
}

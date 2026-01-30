import { Globe, Shield, Users, Zap } from "lucide-react";
import { Card, CardContent } from "~/components/ui/Card";

export default function About() {
	const values = [
		{
			icon: <Zap className="h-8 w-8 text-primary" />,
			title: "UNFILTERED TRUTH",
			description:
				"We don't bow to corporate interests or political pressure. We report the ground reality as it is.",
		},
		{
			icon: <Shield className="h-8 w-8 text-secondary" />,
			title: "RADICAL INTEGRITY",
			description:
				"Verified sources only. Every piece of intel is cross-checked against frontline reality.",
		},
		{
			icon: <Users className="h-8 w-8 text-primary" />,
			title: "PEOPLE POWERED",
			description:
				"A platform built for voices that are silenced elsewhere. Your stories, your dialogue.",
		},
	];

	return (
		<>
			<div className="bg-black border-b-4 border-primary py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<h1 className="text-4xl md:text-6xl font-display font-black text-primary mb-6 uppercase leading-none">
							BEYOND THE <br />
							<span className="text-foreground">NARRATIVE</span>
						</h1>
						<p className="text-xl font-mono text-foreground leading-relaxed max-w-2xl">
							OBSERVER IS NOT JUST A NEWS SITE. IT'S A HUB FOR THE
							RESISTANCE AGAINST MISINFORMATION. WE CUT THROUGH
							THE NOISE TO BRING YOU THE RAW TRUTH FROM THE
							FRONTLINES.
						</p>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-20">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
					{values.map((value, idx) => (
						<Card
							key={idx}
							className="border-2 border-primary bg-black hover-elevate transition-all"
						>
							<CardContent className="p-8 pt-10 space-y-4">
								<div className="w-fit mx-auto">
									{value.icon}
								</div>
								<h3 className="text-2xl font-display  text-center font-black uppercase text-primary">
									{value.title}
								</h3>
								<p className="font-mono text-muted-foreground">
									{value.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="max-w-4xl mx-auto space-y-12">
					<section className="space-y-6">
						<h2 className="text-4xl font-display font-black uppercase border-l-8 border-primary pl-6">
							OUR MISSION
						</h2>
						<p className="text-lg leading-relaxed font-mono">
							In an era of controlled narratives and algorithmic
							bias, the truth is the most powerful weapon we have.
							Observer was founded on the principle that people
							deserve access to unspun information about the
							Palestinian struggle and regional developments.
						</p>
					</section>

					<section className="space-y-6">
						<h2 className="text-4xl font-display font-black uppercase border-l-8 border-secondary pl-6">
							JOIN THE MOVEMENT
						</h2>
						<p className="text-lg leading-relaxed font-mono">
							This isn't a passive experience. Engage in our
							forum, share verified intel, and challenge the
							status quo. We are building a community of critical
							thinkers who refuse to be fed a curated version of
							reality.
						</p>
					</section>
				</div>
			</div>
		</>
	);
}

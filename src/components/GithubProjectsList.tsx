"use client";
import { Box, Chip } from "@mui/material";
import {
	useQuery,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { Suspense } from "react";

import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";

type GithugProjectsProps = {
	username: string;
};
type GithugProjectCardProps = {
	project: any;
};

const fetchProjects = async ({ username }: GithugProjectsProps) => {
	const url = `https://api.github.com/users/${username}/repos`;
	const response = await fetch(url);
	const data = await response.json();
	const projects = data.filter(
		(project: any) =>
			!(project.fork || project.name === username || project.name === ".github")
	);
	return projects;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});

const ProjectsList: React.FC<GithugProjectsProps> = ({ username }) => {
	const getProjects = async () => {
		return fetchProjects({ username });
	};
	const { data, isLoading, isError } = useQuery({
		queryKey: ["projects"],
		queryFn: getProjects,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error fetching projects</div>;
	}

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr));",
				gap: 3,
			}}
		>
			{data?.map((project: any) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</Box>
	);
};

const ProjectCard: React.FC<GithugProjectCardProps> = ({ project }) => {
	return (
		<Card key={project.id}>
			<CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
					<img
						height="20"
						width="20"
						style={{ clipPath: "circle()" }}
						src={project.owner.avatar_url}
						alt="User Avatar"
					/>
					<Link href={project.html_url}>{project.name}</Link>
				</Box>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ fontSizeAdjust: -1 }}
				>
					{project.description}
				</Typography>
			</CardContent>
			<CardActions>
				{project.language && (
					<Chip
						variant="filled"
						size="small"
						label={project.language}
						component="a"
						href={project.homepage}
					/>
				)}
				<Chip
					variant="filled"
					size="small"
					icon={<StarIcon />}
					label={`${project.stargazers_count} star${
						project.stargazers_count === 1 ? "" : "s"
					}`}
					component="a"
					href={project.homepage}
				/>
			</CardActions>
		</Card>
	);
};

export const GithubProjectsList: React.FC<GithugProjectsProps> = ({
	username,
}) => {
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectsList username={username} />
			</Suspense>
		</QueryClientProvider>
	);
};

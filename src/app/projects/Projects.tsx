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

const getProjects = async () => {
	const url = `https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/repos`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
});

export const Projects: React.FC = () => {
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectsList />
			</Suspense>
		</QueryClientProvider>
	);
};

export const ProjectsList: React.FC = () => {
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
				<Card key={project.id}>
					<CardContent
						sx={{ display: "flex", flexDirection: "column", gap: 2 }}
					>
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
			))}
		</Box>
	);
};

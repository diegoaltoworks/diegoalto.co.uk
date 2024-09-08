import styles from "./page.module.scss";
import { GithubProjectsList } from "@/components/GithubProjectsList";
import { Alert } from "@mui/material";

export default function ProjectsPage() {
	return (
		<main className={styles.main} data-testid="page-body">
			<h1
				className={styles.title}
				data-testid="page-title"
				role="heading"
				aria-level={1}
			>
				Projects
			</h1>
			{process.env.NEXT_PUBLIC_GITHUB_USERNAME ? (
				<GithubProjectsList
					username={process.env.NEXT_PUBLIC_GITHUB_USERNAME}
				/>
			) : (
				<Alert severity="error">Missing github username</Alert>
			)}
		</main>
	);
}

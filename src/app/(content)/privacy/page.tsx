import { Alert } from "@mui/material";
import styles from "./page.module.scss";
import { MarkdownToHTML } from "@/components/MarkdownToHTML";

export default function PrivacyPage() {
	return (
		<main className={styles.main} data-testid="page-body">
			<h1
				className={styles.title}
				data-testid="page-title"
				role="heading"
				aria-level={1}
			>
				Privacy
			</h1>
			<article className={styles.article} data-testid="page-copy">
				{process.env.NEXT_PUBLIC_GITHUB_USERNAME ? (
					<MarkdownToHTML
						url={`https://raw.githubusercontent.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/main/PRIVACY.md`}
					/>
				) : (
					<Alert severity="error">Missing github username</Alert>
				)}
			</article>
		</main>
	);
}

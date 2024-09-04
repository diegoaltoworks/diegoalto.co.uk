import { marked } from "marked";
import styles from "./page.module.scss";

// Set options
marked.use({
	async: true,
	pedantic: false,
	gfm: true,
});

const MARKDOWN_URL =
	"https://raw.githubusercontent.com/diegoaltoworks/diegoaltoworks/main/README.md";

const getMarkdown = async () => {
	return fetch(MARKDOWN_URL).then((res) => res.text());
};
export default async function AboutPage() {
	const md = await getMarkdown();
	const html = await marked.parse(md);
	return (
		<main className={styles.main} data-testid="page-body">
			<h1 className={styles.title} data-testid="page-title">
				About
			</h1>
			<article
				className={styles.article}
				dangerouslySetInnerHTML={{ __html: html }}
				data-testid="page-copy"
			/>
		</main>
	);
}

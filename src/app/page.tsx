import styles from "./page.module.scss";

export default function Home() {
	return (
		<main className={styles.main} data-testid="page-body">
			<div role="heading" aria-level={1}>
				Olá!
			</div>
			<div role="subheading" aria-level={2}>
				I{"'"}m Diego
			</div>
			<div role="subheading" aria-level={3}>
				A software engineer from London
			</div>
		</main>
	);
}

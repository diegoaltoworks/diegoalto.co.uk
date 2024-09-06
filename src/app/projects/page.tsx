import React from "react";
import styles from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { Projects } from "./Projects";

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
			<Projects />
		</main>
	);
}

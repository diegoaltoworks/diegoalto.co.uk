import React from "react";
import { ContactForm } from "@/components/ContactForm";
import styles from "./page.module.scss";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function ContactPage() {
	return (
		<main className={styles.main} data-testid="page-body">
			<h1
				className={styles.title}
				data-testid="page-title"
				role="heading"
				aria-level={1}
			>
				Contact
			</h1>
			<ContactForm />
			<Typography>
				<Link data-testid="privacy-link" href="/privacy">
					Privacy policy
				</Link>
			</Typography>
		</main>
	);
}

import React from "react";
import { ContactForm } from "@/components/ContactForm";
import styles from "./page.module.scss";

export default function ContactPage() {
	return (
		<main className={styles.main} data-testid="page-body">
			<h1>Contact</h1>
			<ContactForm />
		</main>
	);
}

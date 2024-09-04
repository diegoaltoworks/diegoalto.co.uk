"use client";
import React from "react";
import { Header } from "@/components/Template/Header";
import { Footer } from "@/components/Template/Footer";
import { HideOnScroll } from "@/components/Template/HideOnScroll";
import styles from "./template.module.scss";

const App: React.FC = ({ children }: React.PropsWithChildren) => {
	return (
		<div className={styles.wrap}>
			<div className={styles.main}>{children}</div>
			<HideOnScroll direction="up">
				<div className={styles.header}>
					<Header />
				</div>
			</HideOnScroll>
			<HideOnScroll direction="down">
				<div className={styles.footer}>
					<Footer />
				</div>
			</HideOnScroll>
		</div>
	);
};

export default App;

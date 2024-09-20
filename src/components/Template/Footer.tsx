"use client";
import React from "react";
import { Copyright } from "./Footer/Copyright";
import { Navigation } from "./Footer/Navigation";
import { HideOnScroll } from "./HideOnScroll";
import styles from "./Template.module.scss";

export const Footer: React.FC = () => {
	return (
		<HideOnScroll direction="down">
			<div className={styles.footer}>
				<footer style={{ width: "100%" }}>
					<Copyright />
					<Navigation />
				</footer>
			</div>
		</HideOnScroll>
	);
};

import React from "react"
import styles from "./template.module.css"
import { Menu } from "@/components/Menu"

export default function Template({children}:{children:React.ReactNode}) {
	return (
		<main className={styles.wrap}>
			<div className={styles.main}>{children}</div>
			<div className={styles.menu}>
				<Menu/>
			</div>
		</main>
	)
}

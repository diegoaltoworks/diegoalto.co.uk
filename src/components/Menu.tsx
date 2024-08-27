import Link from "next/link"
import styles from "./Menu.module.css"

export const Menu = () => {
	return (
		<nav className={styles.wrap} data-testid="menu">
			<ul className={styles.nav}>
				<li><Link href="/">Home</Link></li>
				<li><Link href="/about">About</Link></li>
				<li><Link href="/contact">Contact</Link></li>
			</ul>
		</nav>
	)
}

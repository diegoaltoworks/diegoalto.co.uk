import Link from "next/link";
import styles from "./Slides.module.scss";

export default function Slide2() {
	return (
		<div className={styles.slide} data-testid="homepage-slide" data-slide="2">
			<div role="heading" aria-level={1}>
				Checkout some of the
			</div>
			<div role="subheading" aria-level={2} className={styles.bigun}>
				<Link href="/projects">projects</Link>
			</div>
			<div role="subheading" aria-level={3}>
				I{`'`}ve open-sourced on{" "}
				<Link href="https://github.com/diegoaltoworks">my github profile</Link>
			</div>
		</div>
	);
}

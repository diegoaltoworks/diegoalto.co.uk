import Link from "next/link";
import styles from "./Slides.module.scss";

export default function Slide1() {
	return (
		<div className={styles.slide} data-testid="page-slide1">
			<div role="heading" aria-level={1} data-testid="homepage-hello">
				Olá!
			</div>
			<div role="subheading" aria-level={2} className={styles.bigun}>
				I{"'"}m Diego,
			</div>
			<div role="subheading" aria-level={3}>
				a{" "}
				<Link href="https://www.linkedin.com/in/diegoworks/">
					software engineer from London
				</Link>
			</div>
		</div>
	);
}

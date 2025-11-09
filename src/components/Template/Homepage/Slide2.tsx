import Link from "next/link";
import BackgroundSlide from "./BackgroundSlide";
import styles from "./Slides.module.scss";

export default function Slide2() {
	return (
		<BackgroundSlide
			slideNumber={2}
			imageSrc="/backgrounds/japan.jpg"
			imageAlt="Japanese torii gate at sunset with Mount Fuji in background"
			priority={false}
		>
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
		</BackgroundSlide>
	);
}

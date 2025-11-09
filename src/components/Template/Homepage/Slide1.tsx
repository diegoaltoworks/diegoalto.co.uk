import Link from "next/link";
import BackgroundSlide from "./BackgroundSlide";
import styles from "./Slides.module.scss";

export default function Slide1() {
	return (
		<BackgroundSlide
			slideNumber={1}
			imageSrc="/backgrounds/swiss.jpg"
			imageAlt="Swiss Alps landscape with mountain peaks and serene lake"
			priority={true}
		>
			<div role="heading" aria-level={1}>
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
		</BackgroundSlide>
	);
}

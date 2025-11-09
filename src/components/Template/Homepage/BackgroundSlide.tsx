import Image from "next/image";
import { ReactNode } from "react";
import styles from "./Slides.module.scss";

interface BackgroundSlideProps {
	slideNumber: 1 | 2 | 3;
	imageSrc: string;
	imageAlt: string;
	priority?: boolean;
	children: ReactNode;
}

export default function BackgroundSlide({
	slideNumber,
	imageSrc,
	imageAlt,
	priority = false,
	children,
}: BackgroundSlideProps) {
	return (
		<div
			className={styles.slide}
			data-testid="homepage-slide"
			data-slide={slideNumber}
		>
			<Image
				src={imageSrc}
				alt={imageAlt}
				fill
				priority={priority}
				quality={85}
				sizes="100vw"
				className={styles.backgroundImage}
				style={{
					objectFit: "cover",
					objectPosition: "center",
				}}
			/>
			<div className={styles.overlay} />
			<div className={styles.content}>{children}</div>
		</div>
	);
}

import styles from "./Homepage.module.scss";
import Slide1 from "./Homepage/Slide1";
import Slide2 from "./Homepage/Slide2";
import Slide3 from "./Homepage/Slide3";

export const Homepage = () => {
	return (
		<main className={styles.slide} data-testid="page-body">
			<Slide1 />
			<Slide2 />
			<Slide3 />
		</main>
	);
};

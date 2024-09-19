import Link from "next/link";
import styles from "./Slides.module.scss";
import Icons from "@/components/Template/Icons";

export default function Slide3() {
	return (
		<div className={styles.slide} data-testid="page-slide3">
			<div role="heading" aria-level={1} data-testid="homepage-hello">
				You can <Link href={"/contact"}>contact me here</Link>,
			</div>
			<div role="subheading" aria-level={2}>
				<Link href="/login">login</Link> and <Link href="/chat">chat</Link>
			</div>
			<div role="subheading" aria-level={3}>
				with my AI bot (also on{" "}
				<Link href="https://t.me/DiegoAlto">
					<Icons.TelegramIcon /> Telegram
				</Link>
				or
				<Link href="https://wa.me/447467053623">
					<Icons.WhatsappIcon /> Whatsapp
				</Link>
				)
			</div>
		</div>
	);
}

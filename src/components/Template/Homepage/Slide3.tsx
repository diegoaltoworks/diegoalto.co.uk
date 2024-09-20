import Link from "next/link";
import styles from "./Slides.module.scss";
import Icons from "@/components/Template/Icons";
import { Button } from "@mui/material";

export default function Slide3() {
	return (
		<div className={styles.slide} data-testid="homepage-slide" data-slide="3">
			<div role="heading" aria-level={1}>
				You can <Link href={"/contact"}>contact me here</Link>,
			</div>
			<div role="subheading" aria-level={2}>
				<Link href="/register">register</Link>/<Link href="/login">login</Link>{" "}
				to
			</div>
			<div role="subheading" aria-level={2}>
				chat <Link href="/chat">chat</Link> with my AI bot
			</div>
			<div role="subheading" aria-level={3}>
				(also on{" "}
				<Link href="https://t.me/DiegoAlto">
					<Button>
						<Icons.TelegramIcon /> Telegram
					</Button>
				</Link>
				or{" "}
				<Link href="https://wa.me/447467053623">
					<Button>
						<Icons.WhatsappIcon /> Whatsapp
					</Button>
				</Link>
				)
			</div>
		</div>
	);
}

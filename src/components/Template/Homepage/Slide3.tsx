import Link from "next/link";
import styles from "./Slides.module.scss";
import { Tooltip } from "@mui/material";

export default function Slide3() {
	return (
		<div className={styles.slide} data-testid="homepage-slide" data-slide="3">
			<div role="heading" aria-level={1}>
				You can <Link href={"/contact"}>contact me here</Link>.
			</div>
			<div role="subheading" aria-level={2}>
				Or <Link href="/register">register</Link>/
				<Link href="/login">login</Link> to
			</div>
			<div role="subheading" aria-level={2}>
				<Tooltip title="Under construction">
					<span>
						<Link href="#">chat</Link> with my AI bot
					</span>
				</Tooltip>
			</div>
			<div role="subheading" aria-level={3}>
				(also on{" "}
				<Link href="https://t.me/DiegoAlto">
					{/* <Icons.TelegramIcon fontSize="small" />  */}
					Telegram
				</Link>{" "}
				or{" "}
				<Link href="https://wa.me/447467053623">
					{/* <Icons.WhatsappIcon fontSize="small" />  */}
					Whatsapp
				</Link>
				)
			</div>
		</div>
	);
}

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

export const Logo: React.FC = () => {
	return (
		<Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 2 }}>
			<Box sx={{ clipPath: "circle()", height: 40 }}>
				<Link href="/">
					<Image src="/logo.jpg" alt="logo" width={40} height={40} />
				</Link>
			</Box>
			<Typography
				variant="h6"
				noWrap
				component="div"
				sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
			>
				Diego
			</Typography>
		</Box>
	);
};

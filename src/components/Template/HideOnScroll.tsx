"use client";
import React from "react";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface IHideOnScroll extends React.PropsWithChildren {
	children: React.ReactElement<any>;
	direction?: "up" | "down";
}
export const HideOnScroll = ({
	children,
	direction,
	...props
}: IHideOnScroll) => {
	const trigger = useScrollTrigger();
	const slideDirection = direction == "down" ? "up" : "down";

	return (
		<Slide appear={false} direction={slideDirection} in={!trigger}>
			{children}
		</Slide>
	);
};

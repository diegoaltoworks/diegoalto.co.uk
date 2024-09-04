"use client";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: {
			main: "#333333",
		},
		secondary: {
			main: "#990000",
		},
	},
};

export const theme = createTheme(themeOptions);

export const Theme = ({ children }: React.PropsWithChildren) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import {
	AppRouterContext,
	AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { render, RenderOptions } from "@testing-library/react";

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<AppRouterContext.Provider value={{} as AppRouterInstance}>
		<React.StrictMode>
			<ClerkProvider>{children}</ClerkProvider>
		</React.StrictMode>
	</AppRouterContext.Provider>
);

export const clearRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

//export * from "@testing-library/react";

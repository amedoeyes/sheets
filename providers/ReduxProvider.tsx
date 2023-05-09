"use client";

import store from "@/utils/store";
import { Provider } from "react-redux";

type ReduxProviderProps = {
	children: React.ReactNode;
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
	return <Provider store={store}>{children}</Provider>;
}

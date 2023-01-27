import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest: {
				name: "Sheets",
				short_name: "Sheets",
				description: "Survey sheets",
				orientation: "portrait-primary",
				theme_color: "#101010",
				background_color: "#101010",
				icons: [
					{
						src: "icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			devOptions: {
				enabled: process.env.NODE_ENV === "development" ? true : false,
			},
		}),
	],
});

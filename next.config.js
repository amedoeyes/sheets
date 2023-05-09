const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@mui/material", "@mui/icons-material"],
	modularizeImports: {
		"@mui/material": {
			transform: "@mui/material/{{member}}",
			preventFullImport: true,
		},
		"@mui/icons-material": {
			transform: "@mui/icons-material/{{member}}",
			preventFullImport: true,
		},
	},

	webpack: (config) => {
		config.resolve.alias.canvas = false;
		return config;
	},
};

const withPWA = require("next-pwa")({
	dest: "public",
	disable: isDev,

	exclude: [
		({ asset, compilation }) => {
			if (
				asset.name.startsWith("server/") ||
				asset.name.match(
					/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/
				)
			) {
				return true;
			}
			if (isDev && !asset.name.startsWith("static/runtime/")) {
				return true;
			}
			return false;
		},
	],
});

module.exports = withPWA(nextConfig);

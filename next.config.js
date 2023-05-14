const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "export",
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

const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	cacheOnFrontEndNav: true,
	disable: isDev,
});

module.exports = withPWA(nextConfig);

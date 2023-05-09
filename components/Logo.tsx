type LogoProps = {
	className?: string;
};

export default function Logo({ className }: LogoProps) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="100"
			height="100"
			version="1.1"
			viewBox="0 0 391.624 512"
		>
			<g
				fill="none"
				fillOpacity="1"
				stroke="currentcolor"
				strokeDasharray="none"
				strokeLinecap="square"
				strokeLinejoin="round"
				strokeMiterlimit="10"
				strokeOpacity="1"
				strokeWidth="12.804"
				display="inline"
				paintOrder="normal"
				transform="matrix(1.5431 0 0 1.5339 -190.733 -161.55)"
			>
				<path
					d="M155.006 111.722h190.986a25 25 45 0125 25V407.71a25 25 135 01-25 25H155.006a25 25 45 01-25-25V136.722a25 25 135 0125-25z"
					display="inline"
				></path>
				<g display="inline" transform="translate(-.277)">
					<path d="M130.889 152.15h239.774"></path>
					<path d="M130.889 192.172h239.774"></path>
					<path d="M130.889 232.194h239.774"></path>
					<path d="M130.889 272.216h239.774"></path>
					<path d="M130.889 312.238h239.774"></path>
					<path d="M130.889 352.26h239.774"></path>
					<path d="M130.889 392.282h239.774"></path>
				</g>
				<g>
					<path d="M309.694 112.212V432.22"></path>
					<path d="M249.69 112.212V432.22"></path>
					<path d="M189.687 112.212V432.22"></path>
				</g>
			</g>
		</svg>
	);
}

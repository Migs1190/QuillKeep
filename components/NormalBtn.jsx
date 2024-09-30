import { Link } from "expo-router";

const NormalBtn = ({ dest = "/", content }) => {
	return (
		<Link
			href={dest}
			className="w-1/2 text-center bg-secondary py-5 rounded-full text-white font-robotob text-base"
		>
			{content}
		</Link>
	);
};

export default NormalBtn;

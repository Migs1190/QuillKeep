import { Styles } from "@/constants";
import { Link } from "expo-router";
import { Platform } from "react-native";

const ShadowBtn = ({ dest = "/", content }) => {
	return (
		<Link
			href={dest}
			className="w-1/2 text-center py-5 rounded-full bg-opacity-50 font-robotob text-base"
			style={
				Platform.OS === "android"
					? Styles.ShadowStyles.androidShadow
					: Styles.ShadowStyles.iosShadow
			}
		>
			{content}
		</Link>
	);
};

export default ShadowBtn;

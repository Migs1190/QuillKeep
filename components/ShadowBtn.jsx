import { Link } from "expo-router";
import { Platform } from "react-native";
import { styles } from "../constants";

const ShadowBtn = ({ dest = "/", content }) => {
	return (
		<Link
			href={dest}
			className="w-1/2 text-center py-5 rounded-full bg-white bg-opacity-50 text-p_gray-100 font-robotob text-base"
			style={
				Platform.OS === "android"
					? styles.ShadowStyles.androidShadow
					: styles.ShadowStyles.iosShadow
			}
		>
			{content}
		</Link>
	);
};

export default ShadowBtn;

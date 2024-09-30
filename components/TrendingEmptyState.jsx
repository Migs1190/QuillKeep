import { Colors } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";

const TrendingEmptyState = () => {
	const { mode } = useContext(GlobalContext);
	return (
		<View className="w-full justify-center items-center">
			<MaterialCommunityIcons
				name="book-alert"
				size={100}
				color={Colors[mode].iconDefault}
			/>
			<Text
				className="text-xl dark:text-primary font-robotobd"
				style={{ color: Colors[mode].iconDefault }}
			>
				No Books Trending...
			</Text>
		</View>
	);
};

export default TrendingEmptyState;

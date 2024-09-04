import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../constants";

const TrendingEmptyState = () => {
	return (
		<View className="w-full justify-center items-center">
			<MaterialCommunityIcons
				name="book-alert"
				size={100}
				color={colors.SHADES.gray}
			/>
			<Text className="text-xl text-gray-500 font-robotobd">
				No Books Trending...
			</Text>
			<Text className="text-base text-gray-500 font-robotol">
				Be the first to{" "}
				<Text className="text-secondary font-robotomit">upload</Text>
			</Text>
		</View>
	);
};

export default TrendingEmptyState;

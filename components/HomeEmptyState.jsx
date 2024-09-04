import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../constants";

const HomeEmptyState = () => {
	return (
		<View className="w-full flex-1 justify-center items-center">
			<MaterialCommunityIcons
				name="book-cancel"
				size={100}
				color={colors.SHADES.lightGray}
			/>
			<Text className="text-xl text-p_gray-100 font-robotobd">
				No Books Available
			</Text>
			<Text className="text-base text-p_gray-200 font-robotol">
				Be the first to{" "}
				<Text className="text-secondary font-robotomit">upload</Text>
			</Text>
		</View>
	);
};

export default HomeEmptyState;

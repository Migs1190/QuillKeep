import { Colors } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";

const HomeEmptyState = () => {
	const { mode } = useContext(GlobalContext);
	return (
		<View className="flex-1 w-full justify-center items-center">
			<MaterialCommunityIcons
				name="book-cancel"
				size={100}
				color={Colors[mode].iconDefault}
			/>
			<Text
				className="text-xl dark:text-primary font-robotobd"
				style={{ color: Colors[mode].iconDefault }}
			>
				No Books Available...
			</Text>
		</View>
	);
};

export default HomeEmptyState;

import { Colors } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import { useContext } from "react";
import { Text, View } from "react-native";

const SearchEmptyState = () => {
	const { mode } = useContext(GlobalContext);
	return (
		<View className="w-full pt-10 items-center">
			<Text
				className="text-4xl font-robotolit"
				style={{ color: Colors[mode].text }}
			>
				No books found
			</Text>
		</View>
	);
};

export default SearchEmptyState;

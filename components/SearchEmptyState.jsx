import { View, Text } from "react-native";

const SearchEmptyState = () => {
	return (
		<View className="pt-10 w-full">
			<Text className="text-4xl text-gray-400 font-robotolit">
				No books found
			</Text>
		</View>
	);
};

export default SearchEmptyState;

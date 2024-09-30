import { Colors } from "@/constants";
import { ActivityIndicator, Text, View } from "react-native";

const LoadMoreBtn = () => {
	return (
		<View className="flex-row justify-center items-center p-4 bg-gray-200/50 dark:bg-mine-shaft/50">
			<ActivityIndicator color={Colors.tint} />
			<Text className="text-lg dark:text-primary font-robotolit mx-2">
				Loading More
			</Text>
		</View>
	);
};

export default LoadMoreBtn;

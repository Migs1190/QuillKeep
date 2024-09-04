import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

const Loader = ({ message }) => {
	const progress = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(progress, {
			toValue: 176,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	}, [progress]);

	return (
		<View className="bg-white flex-1 justify-center items-center">
			<Text className="text-2xl font-robotolit">{message}</Text>
			<View className="w-44 h-[2px] mt-2 bg-gray-400">
				<Animated.View
					className="h-full bg-secondary"
					style={{ width: progress }}
				/>
			</View>
		</View>
	);
};

export default Loader;

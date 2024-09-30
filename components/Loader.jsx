import { Colors } from "@/constants";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

const Loader = ({ message, props = "bg-primary dark:bg-wood-smoke" }) => {
	const progress = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(progress, {
			toValue: 176,
			duration: 1500,
			useNativeDriver: false,
		}).start();
	}, [progress]);

	return (
		<View className={`flex-1 justify-center items-center ${props}`}>
			<Text className="text-2xl dark:text-primary font-robotolit">
				{message}
			</Text>
			<View
				className="w-44 h-[2px] mt-2"
				style={{ backgroundColor: Colors.active }}
			>
				<Animated.View
					className="h-full"
					style={{ width: progress, backgroundColor: Colors.tint }}
				/>
			</View>
		</View>
	);
};

export default Loader;

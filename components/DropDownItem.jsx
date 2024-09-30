import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";

const DropDownItem = ({
	animTrigger,
	delay = 0,
	component,
	setRating,
	itemId,
	loading,
}) => {
	const animVar = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(animVar, {
			toValue: animTrigger ? 50 : 0,
			duration: 300,
			delay,
			easing: Easing.elastic(1),
			useNativeDriver: false,
		}).start();
	}, [animTrigger]);

	return (
		<Animated.View
			style={{
				top: animVar,
			}}
		>
			<Pressable
				disabled={loading}
				onPress={() => setRating(itemId)}
			>
				{component}
			</Pressable>
		</Animated.View>
	);
};

export default DropDownItem;

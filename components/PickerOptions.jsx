import { Colors } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import { useContext, useEffect, useRef } from "react";
import { Animated, Easing, Text, TouchableHighlight } from "react-native";

const PickerOptions = ({
	titles,
	animTrigger,
	setAnimTrigger,
	setOption,
	offset = 0,
}) => {
	const { mode } = useContext(GlobalContext);
	const animVars = new Array(titles.length)
		.fill(1)
		.map(() => useRef(new Animated.Value(offset)).current);
	const options = titles.map((item, index) => {
		return { id: index, title: item, ref: animVars[index] };
	});

	useEffect(() => {
		Animated.stagger(
			100,
			options.map((item, i) =>
				Animated.timing(item.ref, {
					toValue: animTrigger ? 50 + i * 40 + offset : offset,
					easing: Easing.elastic(0.2),
					duration: 200,
					useNativeDriver: false,
				}),
			),
		).start();
	}, [animTrigger]);

	return (
		<>
			{options.map((option) => (
				<Animated.View
					key={option.id}
					style={{
						top: option.ref,
						backgroundColor: Colors[mode].componentBackground,
						borderColor: Colors[mode].border,
					}}
					className="w-full border-[1px] rounded-lg left-0 absolute overflow-hidden"
				>
					<TouchableHighlight
						className="py-2 px-2"
						onPress={() => {
							setOption(option.title);
							setAnimTrigger(false);
						}}
						underlayColor={Colors[mode].componentBackgroundSecondary}
					>
						<Text
							className="text-sm font-robotomit"
							style={{ color: Colors[mode].iconDefault }}
						>
							{option.title}
						</Text>
					</TouchableHighlight>
				</Animated.View>
			))}
		</>
	);
};

export default PickerOptions;

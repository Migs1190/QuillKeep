import {
	View,
	Text,
	TouchableOpacity,
	Animated,
	TouchableHighlight,
	Easing,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";

const Picker = ({ option, setOption }) => {
	const [showList, setShowList] = useState(false);
	const optionPos1 = useRef(new Animated.Value(-40)).current;
	const optionPos2 = useRef(new Animated.Value(-40)).current;
	const optionPos3 = useRef(new Animated.Value(-40)).current;

	const options = [
		{
			id: 1,
			title: "Title",
			ref: optionPos1,
		},
		{
			id: 2,
			title: "Author",
			ref: optionPos2,
		},
		{
			id: 3,
			title: "ISBN",
			ref: optionPos3,
		},
	];

	useEffect(() => {
		Animated.timing(optionPos1, {
			toValue: showList ? 5 : -40,
			duration: 500,
			easing: Easing.elastic(1.1),
			useNativeDriver: false,
		}).start();
		Animated.timing(optionPos2, {
			toValue: showList ? 45 : -40,
			duration: 500,
			easing: Easing.elastic(1.1),
			useNativeDriver: false,
		}).start();
		Animated.timing(optionPos3, {
			toValue: showList ? 85 : -40,
			duration: 500,
			easing: Easing.elastic(1.1),
			useNativeDriver: false,
		}).start();
	}, [showList]);

	return (
		<View className="w-20 h-13">
			<TouchableOpacity
				onPress={() => setShowList(!showList)}
				activeOpacity={1}
				className="bg-gray-100 h-full flex-row items-center justify-center border-[1px]	border-gray-200 border-b-0 border-t-0 z-20"
			>
				<Text className="text-gray-600 text-sm font-robotomit">{option}</Text>
				<MaterialIcons
					name={showList ? "keyboard-arrow-up" : "keyboard-arrow-down"}
					size={22}
					color="#4b5563"
				/>
			</TouchableOpacity>
			<Animated.View className="bg-green-300">
				{options.map((item) => (
					<Animated.View
						key={item.id}
						style={{ top: item.ref }}
						className="w-full bg-gray-100 border-[1px] border-gray-200 rounded-lg absolute z-10"
					>
						<TouchableHighlight
							className="py-2 px-2"
							onPress={() => {
								setOption(item.title);
								setShowList(false);
							}}
							underlayColor={"#e5e7eb"}
						>
							<Text className="text-sm text-gray-400 font-robotomit">
								{item.title}
							</Text>
						</TouchableHighlight>
					</Animated.View>
				))}
			</Animated.View>
		</View>
	);
};

export default Picker;

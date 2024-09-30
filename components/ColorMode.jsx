import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import { Colors } from "@/constants";

const ColorMode = () => {
	const { mode, changeTheme } = useContext(GlobalContext);
	const [activeOgPos, setActiveOgPos] = useState(0);
	const [currentTheme, setCurrentTheme] = useState("system");
	const activePos = useRef(new Animated.Value(activeOgPos)).current;

	useEffect(() => {
		checkPos();
	}, []);

	const checkPos = async () => {
		const theme = await AsyncStorage.getItem("theme");
		if (theme) {
			setActiveOgPos(theme === "light" ? 0 : theme === "dark" ? 25 : 50);
			switchMode(theme);
			return;
		}
		return await AsyncStorage.setItem("theme", "system");
	};

	const switchMode = (md) => {
		Animated.timing(activePos, {
			toValue: md === "light" ? 0 : md === "dark" ? 25 : 50,
			duration: 300,
			easing: Easing.elastic(0.2),
			useNativeDriver: false,
		}).start(() => {
			setCurrentTheme(md);
			AsyncStorage.setItem("theme", md);
			changeTheme(md);
		});
	};

	return (
		<View
			className="flex-row justify-between items-center h-44 rounded-[15px] overflow-hidden"
			style={{ backgroundColor: Colors[mode].background,  }}
		>
			<Pressable
				onPress={() => switchMode("light")}
				className="h-full flex-1 justify-around items-center pt-4 rounded-l-[15px] border-4"
				style={{ borderColor: Colors[mode].border }}
			>
				<MaterialIcons
					name="light-mode"
					size={25}
					color={
						currentTheme === "light"
							? Colors[mode].active
							: Colors[mode].iconDefault
					}
				/>
				<View className="py-5">
					<Text
						className="text-xl font-robotocnit"
						style={{
							color:
								currentTheme === "light"
									? Colors[mode].active
									: Colors[mode].iconDefault,
						}}
					>
						Light
					</Text>
				</View>
			</Pressable>
			<Pressable
				onPress={() => switchMode("dark")}
				className="h-full flex-1 justify-around items-center pt-4 border-t-4 border-b-4"
				style={{ borderColor: Colors[mode].border }}
			>
				<MaterialIcons
					name="dark-mode"
					size={25}
					color={
						currentTheme === "dark"
							? Colors[mode].active
							: Colors[mode].iconDefault
					}
				/>
				<View className="py-5">
					<Text
						className="text-xl font-robotocnit"
						style={{
							color:
								currentTheme === "dark"
									? Colors[mode].active
									: Colors[mode].iconDefault,
						}}
					>
						Dark
					</Text>
				</View>
			</Pressable>
			<Pressable
				onPress={() => switchMode("system")}
				className="h-full flex-1 justify-around items-center pt-4 rounded-r-[15px] border-4"
				style={{ borderColor: Colors[mode].border }}
			>
				<MaterialCommunityIcons
					name="theme-light-dark"
					size={25}
					color={
						currentTheme === "system"
							? Colors[mode].active
							: Colors[mode].iconDefault
					}
				/>
				<View className="py-5">
					<Text
						className="text-xl font-robotocnit"
						style={{
							color:
								currentTheme === "system"
									? Colors[mode].active
									: Colors[mode].iconDefault,
						}}
					>
						System
					</Text>
				</View>
			</Pressable>
			<Animated.View
				className="w-1/3 h-full absolute top-0 opacity-75 -z-10"
				style={{
					backgroundColor: Colors.tint,
					left: activePos.interpolate({
						inputRange: [0, 75],
						outputRange: ["0%", "100%"],
					}),
				}}
			/>
		</View>
	);
};

export default ColorMode;

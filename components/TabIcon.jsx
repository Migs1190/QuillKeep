import { Colors } from "@/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useContext } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";

const TabIcon = ({ icon, focused, title }) => {
	const { mode } = useContext(GlobalContext);

	return (
		<View className="items-center justify-center gap-1">
			<FontAwesome5
				name={icon}
				size={24}
				color={
					focused ? Colors[mode].tabIconSelected : Colors[mode].tabIconDefault
				}
			/>
			<Text
				className={`${
					focused ? "font-robotomit" : "font-robotor dark:text-primary"
				} text-xs`}
				style={{
					color: focused
						? Colors[mode].tabIconSelected
						: Colors[mode].tabIconDefault,
				}}
			>
				{title}
			</Text>
		</View>
	);
};

export default TabIcon;

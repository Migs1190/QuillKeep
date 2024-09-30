import { Colors } from "@/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";

const SettingsPanel = ({
	dest = "#",
	icon,
	content,
	link = true,
	fn = (f) => f,
}) => {
	const { mode } = useContext(GlobalContext);
	return (
		<Pressable
			onPress={fn}
			className="p-4 rounded-lg mb-2"
			style={{
				elevation: 7,
				backgroundColor: Colors[mode].componentBackground,
			}}
		>
			{link && (
				<Link
					href={dest}
					className="absolute top-0 bottom-0 left-0 right-0 z-10"
				/>
			)}
			<View className={"flex-row justify-start items-center"}>
				<FontAwesome5
					name={icon}
					size={24}
					color={Colors[mode].iconDefault}
				/>
				<Text
					className="text-base font-robotor mx-4"
					style={{ color: Colors[mode].iconDefault }}
				>
					{content}
				</Text>
				<View className="ml-auto mr-4">
					<MaterialIcons
						name="arrow-forward-ios"
						size={24}
						color={Colors[mode].iconDefault}
					/>
				</View>
			</View>
		</Pressable>
	);
};

export default SettingsPanel;

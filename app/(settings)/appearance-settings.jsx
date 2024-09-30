import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorMode from "../../components/ColorMode";
import CirclesBG from "../../components/SvgBgCircles";
import { Colors } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import { useContext } from "react";

const Appearance = () => {
	const { mode } = useContext(GlobalContext);
	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: Colors[mode].background }}
		>
			<CirclesBG />
			<View className="p-10">
				<Text
					className="text-3xl font-robotol mx-auto"
					style={{ color: Colors[mode].text }}
				>
					Appearance Settings
				</Text>
			</View>
			<View className="px-6">
				<ColorMode />
			</View>
		</SafeAreaView>
	);
};

export default Appearance;

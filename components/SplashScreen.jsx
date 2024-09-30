import { Colors } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashFrame from "./SVGs/SplashFrame";
import QkLogo from "./SVGs/SplashLogo";

const CustomSplashScreen = ({ setTrigger }) => {
	const { mode } = useContext(GlobalContext);

	return (
		<SafeAreaView className="flex-1 justify-center items-center bg-primary dark:bg-wood-smoke">
			<SplashFrame
				color={Colors.tint}
				strokeWidth={5}
			/>
			<QkLogo
				mainColor={Colors.tint}
				secondaryColor={Colors[mode].iconDefault}
				setTrigger={setTrigger}
			/>
		</SafeAreaView>
	);
};

export default CustomSplashScreen;

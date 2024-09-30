import WelcomeLogo from "@/components/SVGs/WelcomeLogo";
import CustomSplashScreen from "@/components/SplashScreen";
import { Colors } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import NormalBtn from "@components/NormalBtn";
import ShadowBtn from "@components/ShadowBtn";
import CirclesBG from "@components/SvgBgCircles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useFonts } from "expo-font";
import { Link, Redirect } from "expo-router";
import { SplashScreen } from "expo-router";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.hideAsync();

const App = () => {
	const [isDone, setIsDone] = useState(false); //The custom splash screen animation	is done
	const { isLogged, mode } = useContext(GlobalContext);

	const [fontsLoaded, error] = useFonts({
		"Roboto-Black": require("@fonts/Roboto-Black.ttf"),
		"Roboto-BlackItalic": require("@fonts/Roboto-BlackItalic.ttf"),
		"Roboto-Bold": require("@fonts/Roboto-Bold.ttf"),
		"Roboto-BoldCondensed": require("@fonts/Roboto-BoldCondensed.ttf"),
		"Roboto-BoldCondensedItalic": require("@fonts/Roboto-BoldCondensedItalic.ttf"),
		"Roboto-BoldItalic": require("@fonts/Roboto-BoldItalic.ttf"),
		"Roboto-Condensed": require("@fonts/Roboto-Condensed.ttf"),
		"Roboto-CondensedItalic": require("@fonts/Roboto-CondensedItalic.ttf"),
		"Roboto-Light": require("@fonts/Roboto-Light.ttf"),
		"Roboto-LightItalic": require("@fonts/Roboto-LightItalic.ttf"),
		"Roboto-Medium": require("@fonts/Roboto-Medium.ttf"),
		"Roboto-MediumItalic": require("@fonts/Roboto-MediumItalic.ttf"),
		"Roboto-Regular": require("@fonts/Roboto-Regular.ttf"),
		"Roboto-Thin": require("@fonts/Roboto-Thin.ttf"),
		"Roboto-ThinItalic": require("@fonts/Roboto-ThinItalic.ttf"),
	});

	useEffect(() => {
		if (error) console.error(error);
	}, [fontsLoaded, isLogged, error]);
	if (!fontsLoaded || (!fontsLoaded && !error)) return null;
	if (isLogged) return <Redirect href="/home" />;

	if (isDone && isLogged !== null)
		return (
			<SafeAreaView
				className="w-full h-full justify-evenly items-center"
				style={{ backgroundColor: Colors[mode].background }}
			>
				<CirclesBG />
				<View className="w-full items-center justify-center">
					<WelcomeLogo color={Colors[mode].text} />
					<View className="mt-12 mb-5">
						<Text
							className="font-robotor text-sm text-center dark:text-primary"
							style={{ color: Colors[mode].text }}
						>
							Discover a world of stories at your fingertips.
						</Text>
					</View>
					<View className="w-24 flex-row justify-between">
						<FontAwesome5
							name="glasses"
							size={15}
							color={Colors[mode].iconFirst}
						/>
						<FontAwesome5
							name="book-open"
							size={15}
							color={Colors[mode].iconDefault}
						/>
						<FontAwesome5
							name="palette"
							size={15}
							color={Colors[mode].iconDefault}
						/>
						<FontAwesome5
							name="lightbulb"
							size={15}
							color={Colors[mode].iconDefault}
						/>
					</View>
				</View>

				<View className="w-full">
					<View className="w-full justify-center flex-row px-4">
						<ShadowBtn
							dest="/sign-in"
							content="Sign In"
						/>
						{/* Separator */}
						<View className="w-2" />
						<NormalBtn
							dest="/sign-up"
							content="Create an account"
						/>
					</View>
					<Link
						// TODO make /home something else
						href="/home"
						className="font-robotor text-sm text-center mt-8"
						style={{ color: Colors[mode].text }}
					>
						Explore as a visitor
					</Link>
				</View>
			</SafeAreaView>
		);
	return <CustomSplashScreen setTrigger={setIsDone} />;
};

export default App;

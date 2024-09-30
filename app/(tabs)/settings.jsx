import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsPanel from "../../components/SettingsPanel";
import CirclesBg from "../../components/SvgBgCircles";
import { GlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../lib/appwrite";
import { Colors } from "@/constants";

const Settings = () => {
	const { mode, fetchUserData, isLogged } = useContext(GlobalContext);
	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: Colors[mode].background }}
		>
			<CirclesBg />
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "stretch",
				}}
			>
				<View className="justify-start items-center flex-1 pt-10 px-8">
					<View className="p-10">
						<Text className="text-3xl font-robotol mx-auto" style={{color: Colors[mode].text}}>
							Settings
						</Text>
					</View>
					<View className="w-full h-full">
						<SettingsPanel
							icon="user-alt"
							content="Account"
							dest={isLogged ? "account-settings" : "sign-in"}
						/>
						{/* <SettingsPanel
								icon="sliders-h"
								content="General Settings"
							/> */}
						{/* <SettingsPanel
								icon="user-shield"
								content="Privacy Settings"
							/> */}
						<SettingsPanel
							icon="moon"
							content="Appearance Settings"
							dest="(settings)/appearance-settings"
						/>
						<SettingsPanel
							icon="question-circle"
							content="Help and Support"
							dest="help"
						/>
						{isLogged && (
							<SettingsPanel
								icon="sign-out-alt"
								content="Sign out"
								fn={async () => {
									await signOut();
									await fetchUserData();
									router.replace("/");
								}}
								link={false}
							/>
						)}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Settings;

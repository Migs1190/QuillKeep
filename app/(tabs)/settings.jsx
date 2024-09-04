import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsPanel from "../../components/SettingsPanel";

const Settings = () => {
	return (
		<SafeAreaView className="bg-white flex-1">
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor: "white",
					justifyContent: "center",
					alignItems: "stretch",
				}}
			>
				<View className="justify-evenly gap-y-5 px-6">
					<View>
						<Text className="text-3xl font-robotol mx-auto">Settings</Text>
					</View>
					<View>
						<SettingsPanel
							icon="user-alt"
							content="Account"
							first
						/>
						<SettingsPanel
							icon="bell"
							content="Notification Settings"
						/>
						<SettingsPanel
							icon="sliders-h"
							content="General Settings"
							last
						/>
					</View>
					<View>
						<SettingsPanel
							icon="user-shield"
							content="Privacy Settings"
							first
						/>
						<SettingsPanel
							icon="moon"
							content="Appearance Settings"
						/>
						<SettingsPanel
							icon="cogs"
							content="Advanced Settings"
							last
						/>
					</View>
					<View>
						<SettingsPanel
							icon="question-circle"
							content="Help and Support"
							first
						/>
						<SettingsPanel breaker />
						<SettingsPanel
							icon="sign-out-alt"
							content="Sign out"
							last
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Settings;

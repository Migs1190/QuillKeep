import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GlobalProvider from "../context/GlobalProvider";
import { Colors } from "@/constants";

export default function RootLayout() {
	return (
		<GlobalProvider>
			<SafeAreaProvider>
				<StatusBar backgroundColor={Colors.tint} />
				<Stack>
					<Stack.Screen
						name="index"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(auth)"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="book/[title]"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(settings)/appearance-settings"
						options={{ headerShown: false }}
					/>
				</Stack>
			</SafeAreaProvider>
		</GlobalProvider>
	);
}

import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../constants";
import GlobalProvider from "../context/GlobalProvider";

export default function RootLayout() {
	return (
		<GlobalProvider>
			<SafeAreaProvider>
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
						name="search/[query]"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="book/[title]"
						options={{ headerShown: false }}
					/>
				</Stack>
				<StatusBar backgroundColor={colors.SECONDARY} />
			</SafeAreaProvider>
		</GlobalProvider>
	);
}

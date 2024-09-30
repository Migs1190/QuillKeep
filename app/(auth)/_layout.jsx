import { Stack } from "expo-router";
import {} from "react-native";

const Auth = () => {
	return (
		<Stack>
			<Stack.Screen
				name="sign-in"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="sign-up"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="recover"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="recover-pending"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="recover-done"
				options={{ headerShown: false }}
			/>
		</Stack>
	);
};

export default Auth;

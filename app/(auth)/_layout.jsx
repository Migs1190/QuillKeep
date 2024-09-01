import {} from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Auth = () => {
	return (
		<Stack>
			<Stack.Screen name="sign-in" options={{ headerShown: false }} />
			<Stack.Screen name="sign-up" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Auth;

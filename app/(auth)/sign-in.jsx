import LoginLogo from "@/components/SVGs/LoginLogo";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import CirclesBG from "../../components/SvgBgCircles";
import { GlobalContext } from "../../context/GlobalProvider";
import { signIn } from "../../lib/appwrite";
import { Colors } from "@/constants";
const SignIn = () => {
	const { mode, fetchUserData } = useContext(GlobalContext);
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [loadingSignIn, setLoadingSignIn] = useState(false);

	const submitSignIn = async () => {
		if (credentials.email === "" || credentials.password === "")
			return Alert.alert("Signing In", "Please fill in all fields");

		setLoadingSignIn(true);
		try {
			await signIn({
				email: credentials.email.trim().toLowerCase(),
				password: credentials.password.trim(),
			});
			await fetchUserData();
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error in Sign in", error.message);
		} finally {
			setLoadingSignIn(false);
		}
	};

	return (
		<SafeAreaView className="w-full h-full justify-evenly px-5 bg-primary dark:bg-wood-smoke">
			<CirclesBG />
			<View className="items-center">
				<LoginLogo />
			</View>
			<View>
				<FormField
					value={credentials.email}
					label="Email"
					placeholder="Email"
					handleWrite={setCredentials}
					keyboardType="email-address"
					isDisabled={loadingSignIn}
				/>
				<FormField
					value={credentials.password}
					label="Password"
					placeholder="Password"
					handleWrite={setCredentials}
					isDisabled={loadingSignIn}
				/>
				<Link
					href="/recover"
					className="ml-auto mt-4 text-xs font-robotom underline dark:text-primary"
					disabled={loadingSignIn}
				>
					Forgot your login details?
				</Link>
			</View>
			<Text className="text-center font-robotol dark:text-primary">
				Don't have an account?
				<Link
					href="/sign-up"
					className="text-base font-robotomit"
					disabled={loadingSignIn}
					style={{ color: Colors[mode].link }}
				>
					{" "}
					Sign up
				</Link>
			</Text>
			<View>
				<SubmitButton
					isDisabled={loadingSignIn}
					pressAction={submitSignIn}
				/>
			</View>
		</SafeAreaView>
	);
};

export default SignIn;

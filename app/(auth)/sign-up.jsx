import SignUpLogo from "@/components/SVGs/SignUpLogo";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import CirclesBG from "../../components/SvgBgCircles";
import { GlobalContext } from "../../context/GlobalProvider";
import { signUp } from "../../lib/appwrite";
import { Colors } from "@/constants";

const SignUp = () => {
	const { mode, fetchUserData } = useContext(GlobalContext);
	const [credentials, setCredentials] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [loadingSignUp, setLoadingSignUp] = useState(false);

	const submitSignUp = async () => {
		if (
			credentials.username === "" ||
			credentials.email === "" ||
			credentials.password === ""
		)
			return Alert.alert("Signing up", "Please fill in all fields");

		setLoadingSignUp(true);
		try {
			await signUp({
				email: credentials.email.trim().toLowerCase(),
				password: credentials.password.trim(),
				username: credentials.username.trim(),
			});
			await fetchUserData();
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error in Sign up", error.message);
		} finally {
			setLoadingSignUp(false);
		}
	};

	return (
		<SafeAreaView className="h-full flex-auto justify-evenly px-5 bg-primary dark:bg-wood-smoke">
			<CirclesBG />
			<View className="items-center">
				<SignUpLogo />
			</View>
			<View>
				<FormField
					value={credentials.username}
					label="Username"
					placeholder="Username"
					handleWrite={setCredentials}
					isDisabled={loadingSignUp}
				/>
				<FormField
					value={credentials.email}
					label="Email"
					placeholder="Email"
					handleWrite={setCredentials}
					keyboardType="email-address"
					isDisabled={loadingSignUp}
				/>
				<FormField
					value={credentials.password}
					label="Password"
					placeholder="Password"
					handleWrite={setCredentials}
					isDisabled={loadingSignUp}
				/>
			</View>
			<View>
				<Text className="text-center font-robotol dark:text-primary">
					Already have an account?
					<Link
						href="/sign-in"
						className="text-base font-robotomit"
						disabled={loadingSignUp}
						style={{ color: Colors[mode].link }}
					>
						{" "}
						Sign In
					</Link>
				</Text>
			</View>
			<View>
				<SubmitButton
					isDisabled={loadingSignUp}
					pressAction={submitSignUp}
				/>
			</View>
		</SafeAreaView>
	);
};

export default SignUp;

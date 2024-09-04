import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link, Redirect } from "expo-router";
import { useContext } from "react";
import { Text, View, Image } from "react-native";
import NormalBtn from "../components/NormalBtn";
import ShadowBtn from "../components/ShadowBtn";
import { colors, images } from "../constants";
import { GlobalContext } from "../context/GlobalProvider";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

const cacheImages = async () => {
	const cachedImages = Object.values(images).map((image) => {
		return Image.prefetch(image);
	});
	return Promise.all(cachedImages);
};

const App = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { isLogged } = useContext(GlobalContext);

	useEffect(() => {
		const loadAssets = async () => {
			await cacheImages();
			setIsLoaded(true);
		};
		loadAssets();
	}, []);

	const [fontsLoaded, error] = useFonts({
		"Roboto-Black":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c04002105947bd4/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-BlackItalic":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c0a00372500c843/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-Bold":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c100025e2e0d150/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-BoldCondensed":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c1500302269986d/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-BoldCondensedItalic":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c1b0030bfd2cb9d/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-BoldItalic":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c2200083fab8e1f/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-Condensed":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c270006230f05b7/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-CondensedItalic":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c3d001c00307778/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-Light":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c46002364ba3afb/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-LightItalic":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c4b000f73d70668/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-Medium":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c5b001ca4918eb9/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-MediumItalic":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c60003c93ef9fd0/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-Regular":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c65003068a77b37/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-Thin":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c6a0008f4571125/view?project=66c1378a00165aaa1784&mode=admin",
		"Roboto-ThinItalic":
			"https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c6e00113d9ea600/view?project=66c1378a00165aaa1784&mode=admin",
	});

	useEffect(() => {
		if (error) console.error(error);
		if (fontsLoaded && isLoaded && isLogged !== null) SplashScreen.hideAsync();
	}, [fontsLoaded, isLoaded, isLogged, error]);

	if (!fontsLoaded || (!fontsLoaded && !error)) return null;

	if (isLogged) return <Redirect href="/home" />;

	return (
		<View className="w-full h-full justify-evenly items-center bg-white">
			<View className="w-full items-center justify-center">
				<Image
					source={{ uri: images.logo }}
					resizeMode="contain"
					className="w-64 h-64"
				/>
			</View>

			<View>
				<Text className="font-robotol text-3xl">
					Welcome to{" "}
					<Text className="font-robotomit text-secondary">VividRead</Text>
				</Text>
				<Text className="font-robotor text-sm text-center text-p_gray-100">
					Discover a world of stories at your fingertips.
				</Text>
			</View>

			<View className="w-20 flex-row justify-between">
				<FontAwesome5
					name="glasses"
					size={24}
					color="black"
				/>
				<FontAwesome5
					name="book-open"
					size={24}
					color={colors.SHADES.lightGray}
				/>
				<FontAwesome5
					name="palette"
					size={24}
					color={colors.SHADES.lightGray}
				/>
				<FontAwesome5
					name="lightbulb"
					size={24}
					color={colors.SHADES.lightGray}
				/>
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
					className="font-robotor text-sm text-center text-p_gray-100 mt-8"
				>
					Explore as a visitor
				</Link>
			</View>
		</View>
	);
};

export default App;

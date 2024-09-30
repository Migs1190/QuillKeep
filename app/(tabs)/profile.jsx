import { Colors } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlashList } from "@shopify/flash-list";
import { Redirect, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageModal from "../../components/ImageModal";
import Loader from "../../components/Loader";
import CirclesBG from "../../components/SvgBgCircles";
import InfoBar from "../../components/infoBar";
import { GlobalContext } from "../../context/GlobalProvider";
import { getUserBookmarks, getUserFavorites } from "../../lib/appwrite";

const Profile = () => {
	const { mode, userData, isLogged } = useContext(GlobalContext);
	const [favorites, setFavorites] = useState(null);
	const [bookmarks, setBookmarks] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useFocusEffect(
		useCallback(() => {
			getUserFavorites().then((res) => {
				if (res) setFavorites(res);
				else setFavorites(null);
			});

			getUserBookmarks().then((res) => {
				if (res) setBookmarks(res);
				else setBookmarks(null);
			});

			return () => {
				setBookmarks(null);
				setFavorites(null);
			};
		}, []),
	);

	if (!isLogged) return <Redirect href={"sign-in"} />;

	if (!favorites || !bookmarks)
		return <Loader message={"Preparing you Profile"} />;

	const data = [
		{ title: "My Favorites", icon: "heart", data: favorites },
		{ title: "My Bookmarks", icon: "bookmark", data: bookmarks },
	];

	return (
		<SafeAreaView className="bg-primary dark:bg-wood-smoke flex-1 px-4">
			<CirclesBG />
			<FlashList
				showsVerticalScrollIndicator={false}
				data={data}
				estimatedItemSize={160}
				estimatedListSize={{ height: 122, width: 360 }}
				renderItem={({ item }) => (
					<InfoBar
						title={item.title}
						data={item.data}
						icon={item.icon}
						props="my-2"
					/>
				)}
				ListHeaderComponent={() => (
					<>
						<View className="justify-center items-center pt-10">
							<ImageModal
								imgUri={userData.avatar}
								showModal={showModal}
								setShowModal={setShowModal}
							/>
							<View>
								<View>
									<TouchableOpacity
										className="bg-gray-100 dark:bg-primary grad p-3 rounded-full absolute -top-2 right-3 z-10"
										activeOpacity={0.9}
									>
										<MaterialIcons
											name="add-a-photo"
											size={24}
											color={Colors.text}
										/>
									</TouchableOpacity>
								</View>
								<Pressable onPress={() => setShowModal(true)}>
									<Image
										source={{ uri: userData.avatar }}
										resizeMode="cover"
										className="w-36 h-36 p-2 rounded-full"
										style={{
											backgroundColor: "rgba(255, 255, 255, 0.1)",
											borderWidth: 2,
											borderColor: Colors[mode].text,
										}}
									/>
								</Pressable>
							</View>
						</View>
						<View className="w-full items-center space-y-2 my-8">
							<Text
								className="text-3xl font-robotor"
								style={{ color: Colors[mode].heading }}
							>
								{userData.username}
							</Text>
							<Text className="text-sm font-robotol dark:text-primary">
								Member since:{" "}
								<Text className="font-robotomit">
									{userData.date_registered.split("").slice(0, 10).join("")}
								</Text>
							</Text>
						</View>
					</>
				)}
			/>
		</SafeAreaView>
	);
};

export default Profile;

import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CirclesBG from "../../components/Bg";
import InfoBar from "../../components/infoBar";
import { GlobalContext } from "../../context/GlobalProvider";
import { getUserBookmarks, getUserFavorites } from "../../lib/appwrite";
import Loader from "../../components/Loader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants";

const Profile = () => {
	const { userData } = useContext(GlobalContext);
	const [favorites, setFavorites] = useState(null);
	const [bookmarks, setBookmarks] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		getUserFavorites().then((res) => {
			if (res) setFavorites(res);
			else setFavorites(null);
		});

		getUserBookmarks().then((res) => {
			if (res) setBookmarks(res);
			else setBookmarks(null);
		});
	}, []);

	if (!favorites || !bookmarks)
		return <Loader message={"Preparing you Profile"} />;

	const data = [
		{ title: "My Favorites", icon: "heart", data: favorites },
		{ title: "My Bookmarks", icon: "bookmark", data: bookmarks },
	];

	return (
		<SafeAreaView className="bg-white flex-1 px-4">
			<CirclesBG />
			<FlatList
				showsVerticalScrollIndicator={false}
				data={data}
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
							<View>
								<View>
									<TouchableOpacity
										className="bg-gray-100 grad p-3 rounded-full absolute top-0 right-2 z-10"
										onPress={() => console.log("Add Photo")}
										activeOpacity={0.9}
									>
										<MaterialIcons
											name="add-a-photo"
											size={24}
											color={colors.SHADES.gray}
										/>
									</TouchableOpacity>
								</View>
								<Image
									source={{ uri: userData.avatar }}
									resizeMode="cover"
									className="w-40 h-40 rounded-full"
									onPress={() => setShowModal(true)}
								/>
							</View>
						</View>
						<View className="w-full items-center space-y-2 my-8">
							<Text className="text-3xl font-robotor text-secondary">
								{userData.username}
							</Text>
							<Text className="text-sm font-robotol">
								Member since:{" "}
								<Text className="text-secondary font-robotomit">
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

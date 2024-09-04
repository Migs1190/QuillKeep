import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CirlcesBG from "../../components/Bg";
import CompositeButton from "../../components/CompositeButton";
import Loader from "../../components/Loader";
import { colors } from "../../constants";
import {
	bookmarkHandler,
	favoriteHandler,
	getBookInfo,
} from "../../lib/appwrite";

const BookProfile = () => {
	const params = useLocalSearchParams();

	const [favLoading, setFavLoading] = useState(false);
	const [bookMarkLoading, setBookmarkLoading] = useState(false);
	const [showTitle, setShowTitle] = useState(false);
	const [bookData, setBookData] = useState(null);

	useEffect(() => {
		getBookInfo(params.isbn).then((data) => {
			if (data) setBookData(data);
			else setBookData(null);
		});
	}, []);

	const favoriteWrapper = async () => {
		setFavLoading(true);
		await favoriteHandler(bookData.$id);
		setBookData({ ...bookData, isFavorite: !bookData.isFavorite });
		setFavLoading(false);
	};

	const bookmarkWrapper = async () => {
		setBookmarkLoading(true);
		await bookmarkHandler(bookData.$id);
		setBookData({ ...bookData, isBookmarked: !bookData.isBookmarked });
		setBookmarkLoading(false);
	};

	if (!bookData) return <Loader message="Preparing Your Book" />;

	return (
		<SafeAreaView className="bg-white justify-start space-y-4 flex-1 px-4">
			<CirlcesBG />
			<View className="flex-row space-x-4">
				<Image
					source={bookData.cover_l}
					contentFit="cover"
					className="w-36 h-60"
				/>
				<ScrollView
					className="h-60"
					style={{
						borderBottomWidth: showTitle ? 1 : 0,
						borderBottomColor: showTitle ? colors.SECONDARY : "transparent",
					}}
					overScrollMode="never"
				>
					<Text
						className="text-2xl font-robotocn mb-3"
						style={{ height: "auto" }}
						numberOfLines={showTitle ? 0 : 3}
						onPress={() => setShowTitle(!showTitle)}
					>
						{bookData.title}
					</Text>
					<Text className="text-sm font-robotolit text-gray-500">ISBN</Text>
					<Text className="font-robotocnit text-base text-secondary">
						{bookData.isbn}
					</Text>
					<Text className="text-sm font-robotolit text-gray-500">
						Authored by
					</Text>
					<Text className="font-robotocnit text-base text-secondary">
						{bookData.author}
					</Text>
					<Text className="text-sm font-robotolit text-gray-500">
						Published by
					</Text>
					<Text className="text-sm font-robotolit text-gray-500">
						<Text className="font-robotocnit text-base text-secondary">
							{bookData.publisher}
						</Text>{" "}
						in{" "}
						<Text className="font-robotocnit text-base text-secondary">
							{bookData.publishing_year}
						</Text>
					</Text>
				</ScrollView>
			</View>
			<View className="flex-row">
				<CompositeButton
					content="Favorite"
					icon={bookData.isFavorite ? "heart" : "heart-o"}
					color={bookData.isFavorite ? colors.SECONDARY : "gray"}
					pressAction={favoriteWrapper}
					loading={favLoading}
				/>
				<CompositeButton
					content="Library"
					icon={bookData.isBookmarked ? "bookmark" : "bookmark-o"}
					color={bookData.isBookmarked ? colors.SECONDARY : "gray"}
					pressAction={bookmarkWrapper}
					loading={bookMarkLoading}
				/>
			</View>
			<View>
				<Text className="mb-2 mx-auto text-2xl font-robotom text-gray-500">
					Summary
				</Text>
				<Text className="text-base font-robotolit text-center">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus
					possimus, amet facere deserunt doloremque eos veritatis similique
					debitis dolores, consequuntur aut illum neque. Fugiat voluptates totam
					nihil soluta, unde quas enim repellendus corrupti distinctio libero?
					Autem, voluptas optio quas nisi modi quae doloremque obcaecati eveniet
					suscipit molestias, necessitatibus earum fugit.
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default BookProfile;

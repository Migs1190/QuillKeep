import { Colors } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CompositeButton from "../../components/CompositeButton";
import CompositePickerButton from "../../components/CompositePickerButton";
import CompositeRateButton from "../../components/CompositeRateButton";
import ImageModal from "../../components/ImageModal";
import Loader from "../../components/Loader";
import CirclesBG from "../../components/SvgBgCircles";
import { GlobalContext } from "../../context/GlobalProvider";
import {
	bookmarkHandler,
	favoriteHandler,
	getBookInfo,
	rateBook,
	updateStatus,
} from "../../lib/appwrite";

const BookProfile = () => {
	const params = useLocalSearchParams();
	const { isLogged, mode } = useContext(GlobalContext);

	const [bookData, setBookData] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showTitle, setShowTitle] = useState(false);
	const [favLoading, setFavLoading] = useState(false);
	const [bookMarkLoading, setBookmarkLoading] = useState(false);
	const [rating, setRating] = useState(0);
	const [prevRating, setPrevRating] = useState(0);
	const [rateLoading, setRateLoading] = useState(false);
	const [status, setStatus] = useState("Want to Read");
	const [prevStatus, setPrevStatus] = useState("Want to Read");

	useEffect(() => {
		getBookInfo(params.isbn, isLogged).then((data) => {
			if (data) {
				setBookData(data);
				if (isLogged) {
					setPrevRating(data.rating);
					setRating(data.rating);
					setPrevStatus(data.status);
					setStatus(data.status);
				}
				return;
			}
			setBookData(null);
		});
	}, []);

	const copyToClipboard = async (title, content) => {
		await Clipboard.setStringAsync(content);
		ToastAndroid.show(`${title} copied to clipboard`, ToastAndroid.SHORT);
	};

	useEffect(() => {
		const ratingWrapper = async () => {
			if (rateLoading) return;
			const options = [1, 2, 3, 4, 5];
			if (!options.includes(rating)) return;
			if (rating === prevRating) return;

			if (!isLogged) return router.replace("sign-in");

			setRateLoading(true);
			setPrevRating(rating);
			rateBook(bookData.$id, rating)
				.then((res) => res)
				.finally(() => setRateLoading(false));
		};
		ratingWrapper();
	}, [rating]);

	useEffect(() => {
		const statusWrapper = async () => {
			const options = ["Want to Read", "Reading", "Completed", "Dropped"];
			if (!options.includes(status)) return;
			if (status === prevStatus) return;

			if (!isLogged) return router.replace("sign-in");

			updateStatus(bookData.$id, status).then((res) => {
				if (res) setBookData({ ...bookData, status: res.status });
			});
		};
		statusWrapper();
	}, [status]);

	const favoriteWrapper = async () => {
		if (!isLogged) return router.replace("sign-in");

		setFavLoading(true);
		await favoriteHandler(bookData.$id);
		setBookData({ ...bookData, isFavorite: !bookData.isFavorite });
		setFavLoading(false);
	};

	const bookmarkWrapper = async () => {
		if (!isLogged) return router.replace("sign-in");

		setBookmarkLoading(true);
		await bookmarkHandler(bookData.$id);
		setBookData({ ...bookData, isBookmarked: !bookData.isBookmarked });
		setBookmarkLoading(false);
	};

	if (!bookData) return <Loader message="Preparing Your Book" />;

	return (
		<SafeAreaView
			className="space-y-4 flex-1 pt-5 px-4"
			style={{ backgroundColor: Colors[mode].background }}
		>
			<CirclesBG />
			<ImageModal
				imgUri={bookData.cover_l}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
			<View className="flex-row space-x-4">
				<Pressable onPress={() => setShowModal(true)}>
					<Image
						source={bookData.cover_l}
						contentFit="cover"
						className="w-36 h-60"
					/>
				</Pressable>
				<ScrollView
					className="h-60"
					style={{
						borderBottomWidth: showTitle ? 1 : 0,
						borderBottomColor: showTitle ? Colors.tint : "transparent",
					}}
					overScrollMode="never"
				>
					<Text
						className="text-2xl dark:text-primary font-robotocn mb-3"
						style={{ height: "auto" }}
						numberOfLines={showTitle ? 0 : 3}
						onPress={() => setShowTitle(!showTitle)}
					>
						{bookData.title}
					</Text>
					<Pressable onPress={() => copyToClipboard("ISBN", bookData.isbn)}>
						<Text
							className="text-sm font-robotolit"
							style={{ color: Colors[mode].text }}
						>
							ISBN{" "}
							<MaterialIcons
								name="content-copy"
								size={10}
								color={Colors[mode].iconDefault}
							/>
						</Text>
						<Text
							className="font-robotocnit text-base"
							style={{ color: Colors[mode].heading }}
						>
							{bookData.isbn}
						</Text>
					</Pressable>
					<Pressable onPress={() => copyToClipboard("Author", bookData.author)}>
						<Text
							className="text-sm font-robotolit"
							style={{ color: Colors[mode].text }}
						>
							Authored by{" "}
							<MaterialIcons
								name="content-copy"
								size={10}
								color={Colors[mode].iconDefault}
							/>
						</Text>
						<Text
							className="font-robotocnit text-base"
							style={{ color: Colors[mode].heading }}
						>
							{bookData.author}
						</Text>
					</Pressable>
					<Pressable
						onPress={() => copyToClipboard("Publisher", bookData.publisher)}
					>
						<Text
							className="text-sm font-robotolit"
							style={{ color: Colors[mode].text }}
						>
							Published by{" "}
							<MaterialIcons
								name="content-copy"
								size={10}
								color={Colors[mode].iconDefault}
							/>
						</Text>
						<Text
							className="text-sm font-robotolit"
							style={{ color: Colors[mode].text }}
						>
							<Text
								className="font-robotocnit text-base"
								style={{ color: Colors[mode].heading }}
							>
								{bookData.publisher}
							</Text>{" "}
							in{" "}
							<Text
								className="font-robotocnit text-base"
								style={{ color: Colors[mode].heading }}
							>
								{bookData.publishing_year}
							</Text>
						</Text>
					</Pressable>
				</ScrollView>
			</View>
			<ScrollView>
				<View className="flex-row mb-3">
					<CompositeButton
						content="Favorite"
						icon={bookData?.isFavorite ? "heart" : "heart-o"}
						color={
							bookData?.isFavorite ? Colors.tint : Colors[mode].iconDefault
						}
						pressAction={favoriteWrapper}
						loading={favLoading}
					/>
					<CompositeButton
						content="Library"
						icon={bookData?.isBookmarked ? "bookmark" : "bookmark-o"}
						color={
							bookData?.isBookmarked ? Colors.tint : Colors[mode].iconDefault
						}
						pressAction={bookmarkWrapper}
						loading={bookMarkLoading}
					/>
				</View>
				<View className="flex-row mb-10">
					<CompositeRateButton
						content={`Rate (${rating} stars)`}
						icon="star"
						color={Colors[mode].iconDefault}
						rating={rating}
						setRating={setRating}
						loading={rateLoading}
					/>
					{bookData?.isBookmarked && (
						<CompositePickerButton
							content={status}
							color={Colors[mode].iconDefault}
							setStatus={setStatus}
							loading={bookMarkLoading}
						/>
					)}
				</View>
				<View>
					<View>
						<Text
							className="mt-4 mb-2 mx-auto text-2xl font-robotom"
							style={{ color: Colors[mode].iconDefault }}
						>
							Synopsis
						</Text>
						<Text
							className="text-base font-robotolit text-center"
							style={{ color: Colors[mode].text }}
						>
							{bookData.synopsis}
						</Text>
					</View>
					<View className="mt-4 flex-row justify-around">
						<View>
							<Text
								className="mb-2 mx-auto text-2xl font-robotom"
								style={{ color: Colors[mode].iconDefault }}
							>
								Pages
							</Text>
							<Text
								className="text-2xl font-robotomit text-center"
								style={{ color: Colors[mode].text }}
							>
								{bookData.pages}
							</Text>
						</View>
						<View>
							<Text
								className="mb-2 mx-auto text-2xl font-robotom"
								style={{ color: Colors[mode].iconDefault }}
							>
								Reads
							</Text>
							<Text
								className="text-2xl font-robotomit text-center"
								style={{ color: Colors[mode].text }}
							>
								{bookData.reads}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default BookProfile;

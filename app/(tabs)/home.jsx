import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useContext, useEffect, useRef, useState } from "react";
import {
	Animated,
	FlatList,
	RefreshControl,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CirclesBG from "../../components/Bg";
import HomeEmptyState from "../../components/HomeEmptyState";
import Loader from "../../components/Loader";
import TrendingCarousel from "../../components/TrendingCarousel";
import BookItem from "../../components/bookItem";
import { GlobalContext } from "../../context/GlobalProvider";

const Home = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [showScrollToTop, setShowScrollToTop] = useState(false);

	const flatListRef = useRef(null);
	const btnPos = useRef(new Animated.Value(0)).current;

	const { booksData: books, fetchBooks: refetchBooks } =
		useContext(GlobalContext);

	useEffect(() => {
		Animated.timing(btnPos, {
			toValue: showScrollToTop ? -280 : -400,
			useNativeDriver: false,
		}).start();
	}, [showScrollToTop]);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetchBooks();
		setRefreshing(false);
	};

	const checkSctollPosition = (e) => {
		const posY = e.nativeEvent.contentOffset.y;
		if (posY > 600) setShowScrollToTop(true);
		else setShowScrollToTop(false);
	};

	const jumpToTop = () =>
		flatListRef.current.scrollToOffset({ animated: true, offset: 0 });

	if (!books) return <Loader message="Preparing Your Books" />;

	return (
		<SafeAreaView className="bg-white">
			<CirclesBG />

			<FlatList
				contentContainerStyle={{
					flexGrow: 1,
					gap: 50,
				}}
				ref={flatListRef}
				columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
				data={books ?? []}
				keyExtractor={(item) => item.isbn}
				numColumns={2}
				renderItem={({ item }) => <BookItem item={item} />}
				ListHeaderComponent={() => (
					<TrendingCarousel data={books.slice(50, 60)} />
				)}
				ListEmptyComponent={() => <HomeEmptyState />}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				onScroll={checkSctollPosition}
				initialNumToRender={4}
				maxToRenderPerBatch={4}
			/>
			<Animated.View style={{ right: btnPos }}>
				<TouchableOpacity
					className="w-20 h-20 justify-center items-center bg-secondary rounded-full absolute bottom-5 transition"
					onPress={jumpToTop}
					activeOpacity={0.9}
				>
					<FontAwesome5
						name="arrow-up"
						size={30}
						color="white"
					/>
				</TouchableOpacity>
			</Animated.View>
		</SafeAreaView>
	);
};

export default Home;

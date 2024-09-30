import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FlashList } from "@shopify/flash-list";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeEmptyState from "../../components/HomeEmptyState";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import CirclesBG from "../../components/SvgBgCircles";
import TrendingCarousel from "../../components/TrendingCarousel";
import BookItem from "../../components/bookItem";
import { GlobalContext } from "../../context/GlobalProvider";
import { Colors } from "@/constants";

const Home = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [showScrollToTop, setShowScrollToTop] = useState(false);
	const {
		mode,
		featuredBooks: books,
		fetchFeatured: getNextPage,
	} = useContext(GlobalContext);

	const listRef = useRef(null);
	const btnPos = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(btnPos, {
			toValue: showScrollToTop ? -280 : -400,
			useNativeDriver: false,
		}).start();
	}, [showScrollToTop]);

	const onRefresh = async () => {
		setRefreshing(true);
		getNextPage(true);
		setRefreshing(false);
	};

	const checkScrollPosition = (e) => {
		const posY = e.nativeEvent.contentOffset.y;
		if (posY > 600) setShowScrollToTop(true);
		else setShowScrollToTop(false);
	};

	const jumpToTop = () =>
		listRef.current.scrollToOffset({ animated: true, offset: 0 });

	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: Colors[mode].background }}
		>
			<FlashList
				ref={listRef}
				data={books}
				estimatedItemSize={240}
				estimatedListSize={{ height: 600, width: 300 }}
				numColumns={2}
				renderItem={({ item }) => (
					<BookItem
						item={item}
						cardWidth="100%"
						props="px-8 mb-5"
					/>
				)}
				ListEmptyComponent={() => <HomeEmptyState />}
				ListHeaderComponent={() => <TrendingCarousel />}
				ListFooterComponent={() => books.length > 0 && <LoadMoreBtn />}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				onScroll={checkScrollPosition}
				onEndReached={getNextPage}
				initialNumToRender={4}
				maxToRenderPerBatch={4}
			/>
			<Animated.View style={{ right: btnPos }}>
				<TouchableOpacity
					className="w-20 h-20 justify-center items-center rounded-full absolute bottom-5 transition"
					onPress={jumpToTop}
					activeOpacity={0.9}
					style={{ backgroundColor: Colors.tint }}
				>
					<FontAwesome5
						name="arrow-up"
						size={30}
						color={Colors[mode].iconDefault}
					/>
				</TouchableOpacity>
			</Animated.View>
			<CirclesBG />
		</SafeAreaView>
	);
};

export default Home;

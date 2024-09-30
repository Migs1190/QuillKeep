import { Colors } from "@/constants";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import CarouselItem from "./CarouselItem";
import Logo from "./SVGs/Logo";
import TrendingEmptyState from "./TrendingEmptyState";

const TrendingCarousel = () => {
	const { mode, userData, trendingBooks } = useContext(GlobalContext);
	return (
		<View>
			<View className="flex-row justify-between items-center p-2">
				<View className="ml-3">
					<Text className="text-sm font-robotol dark:text-primary">
						{userData ? "Welcome Back" : "Hello there,"}
					</Text>
					<Text
						className="text-3xl font-robotomit"
						style={{ color: Colors[mode].heading }}
					>
						{userData ? userData.username : "Guest"}
					</Text>
				</View>
				<Logo color={Colors.tintDarker} />
			</View>
			<Text
				className="ml-4 pb-5 pt-10 text-3xl font-robotomit"
				style={{ color: Colors[mode].heading }}
			>
				Trending
			</Text>
			<View>
				<FlatList
					data={trendingBooks}
					keyExtractor={(item) => item.isbn}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <CarouselItem item={item} />}
					ListEmptyComponent={() => <TrendingEmptyState />}
					contentContainerStyle={{
						flexGrow: 1,
						height: 260,
					}}
					initialNumToRender={2}
					maxToRenderPerBatch={2}
				/>
			</View>
			<Text
				className="ml-4 pb-5 pt-10 text-3xl font-robotomit"
				style={{ color: Colors[mode].heading }}
			>
				Featured
			</Text>
		</View>
	);
};

export default TrendingCarousel;

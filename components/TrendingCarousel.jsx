import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useContext } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { images } from "../constants";
import { colors } from "../constants";
import { GlobalContext } from "../context/GlobalProvider";
import CarouselItem from "./CarouselItem";
import TrendingEmptyState from "./TrendingEmptyState";

const TrendingCarousel = ({ data: books }) => {
	const { userData } = useContext(GlobalContext);

	return (
		<View className="">
			<View className="flex-row justify-between items-center px-2">
				<View className="ml-3">
					<Text className="text-sm font-robotol">Weclome Back </Text>
					<Text className="text-3xl text-secondary font-robotomit">
						{userData.username}
					</Text>
				</View>
				<Image
					source={{ uri: images.logo }}
					resizeMode="contain"
					className="w-24 h-24"
				/>
			</View>
			<Link
				href={"/trending"}
				className="mt-5 mb-3"
			>
				<View className="flex-row items-center">
					<Text className="ml-4 text-3xl font-robotobd text-secondary">
						Trending
					</Text>
					<MaterialIcons
						name="arrow-forward-ios"
						size={24}
						color={colors.SECONDARY}
					/>
				</View>
			</Link>
			<View>
				<FlatList
					data={books}
					keyExtractor={(item) => item.isbn}
					horizontal
					// showsHorizontalScrollIndicator={false}
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
			<Text className="ml-4 pt-10 text-3xl font-robotol">Featured</Text>
		</View>
	);
};

export default TrendingCarousel;

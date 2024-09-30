import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import SearchEmptyState from "../../components/SearchEmptyState";
import CirclesBG from "../../components/SvgBgCircles";
import BookItem from "../../components/bookItem";
import { searchBooks } from "../../lib/appwrite";
import { Colors } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";

const Search = () => {
	const { mode } = useContext(GlobalContext);
	const WIDTH = Dimensions.get("window").width;
	const [option, setOption] = useState("Title");
	const [searchedData, setSearchedData] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		if (searchQuery === "") {
			setSearchedData(null);
			setLoading(false);
			return;
		}
		searchBooks(searchQuery, option)
			.then((data) => {
				if (data) setSearchedData(data);
				else setSearchedData(null);
			})
			.finally(() => setLoading(false));
	}, [searchQuery]);

	return (
		<SafeAreaView className="bg-primary dark:bg-wood-smoke flex-1 justify-start pt-10 ">
			<CirclesBG />
			<SearchBar
				handleWrite={setSearchQuery}
				option={option}
				setOption={setOption}
				loading={loading}
			/>
			<View
				className="flex-1 px-4 -z-10"
				style={{ width: WIDTH }}
			>
				<FlatList
					contentContainerStyle={{
						width: WIDTH,
					}}
					data={searchedData ?? []}
					keyExtractor={(item) => item.isbn}
					renderItem={({ item }) => (
						<BookItem
							item={item}
							cardWidth={80}
							cardHeight={180}
							props="my-3"
						/>
					)}
					ListEmptyComponent={() => <SearchEmptyState />}
					ListHeaderComponent={() => (
						<Text
							className="pt-10 pb-2 text-xl font-robotocnit"
							style={{ color: Colors[mode].text }}
						>
							Found (
							<Text style={{ color: Colors[mode].heading }}>
								{searchedData?.length ?? 0}
							</Text>
							) Books
						</Text>
					)}
					numColumns={4}
					columnWrapperStyle={{
						gap: 10,
					}}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Search;

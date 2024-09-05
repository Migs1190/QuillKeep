import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import { useContext, useEffect, useState } from "react";
import { searchBooks } from "../../lib/appwrite";
import { Dimensions, FlatList, Text, View } from "react-native";
import BookItem from "../../components/bookItem";
import SearchEmptyState from "../../components/SearchEmptyState";
import { GlobalContext } from "../../context/GlobalProvider";

const Search = () => {
	const WIDTH = Dimensions.get("window").width;
	const [option, setOption] = useState("Title");
	const [searchedData, setSearchedData] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const { booksData: books } = useContext(GlobalContext);

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
		<SafeAreaView className="bg-white flex-1 justify-start pt-10">
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
					data={searchedData ?? books ?? []}
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
						<Text className="pt-10 pb-2 text-xl text-gray-500 font-robotocnit">
							Found (
							<Text className="text-secondary">
								{searchedData ? searchedData?.length : books?.length}
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

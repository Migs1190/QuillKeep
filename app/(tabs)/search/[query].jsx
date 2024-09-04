import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../../components/SearchBar";

const Search = () => {
	return (
		<SafeAreaView className="bg-white flex-1 justify-start pt-10">
			<SearchBar />
		</SafeAreaView>
	);
};

export default Search;

import {
  SafeAreaView,
  FlatList,
  Platform,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import TrendingCarousel from "../../components/TrendingCarousel";
import HomeEmptyState from "../../components/HomeEmptyState";
import CirclesBG from "../../components/Bg";
import BookItem from "../../components/bookItem";
import { GlobalContext } from "../../context/GlobalProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Loader from "../../components/Loader";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const flatListRef = useRef(null);
  const { booksData: books, fetchBooks } = useContext(GlobalContext);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  const checkSctollPosition = (e) => {
    const posY = e.nativeEvent.contentOffset.y;
    if (posY > 600) setShowScrollToTop(true);
    else setShowScrollToTop(false);
  };

  const jumpToTop = () =>
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });

  if (!books) return <Loader />;

  return (
    <SafeAreaView
      className={`bg-white items-center w-full ${
        Platform.OS === "android" && "pt-10"
      }`}
    >
      <CirclesBG />

      <FlatList
        className="w-full"
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
        ListHeaderComponent={() => <TrendingCarousel data={books} />}
        ListEmptyComponent={() => <HomeEmptyState />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={checkSctollPosition}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
      />
      {showScrollToTop && (
        <TouchableOpacity
          className="w-20 h-20 justify-center items-center bg-secondary rounded-full absolute bottom-5 right-4 transition"
          onPress={jumpToTop}
          activeOpacity={0.9}
        >
          <FontAwesome5 name="arrow-up" size={30} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Home;

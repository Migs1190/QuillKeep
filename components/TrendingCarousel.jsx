import { View, Text, Image, SafeAreaView, FlatList } from "react-native";
import React, { useContext } from "react";
import { images } from "@/constants";
import Searchbar from "./SearchBar";
import CarouselItem from "./CarouselItem";
import { colors } from "../constants";
import { Link } from "expo-router";
import { GlobalContext } from "../context/GlobalProvider";
import { MaterialIcons } from "@expo/vector-icons";
import TrendingEmptyState from "./TrendingEmptyState";

const TrendingCarousel = ({ data: books }) => {
  const { userData } = useContext(GlobalContext);

  return (
    <SafeAreaView className="space-y-2">
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
      <View className="px-2">
        <Searchbar />
      </View>
      <Link href={"/trending"}>
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
      <View className="">
        <FlatList
          data={books ? books.slice(400, 410) : []}
          keyExtractor={(item) => item.isbn}
          horizontal
          // showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CarouselItem item={item} />}
          ListEmptyComponent={() => <TrendingEmptyState />}
          contentContainerStyle={{
            flexGrow: 1,
            height: 260,
          }}
        />
      </View>
      <Text className="ml-4 pt-10 text-3xl font-robotol">Featured</Text>
    </SafeAreaView>
  );
};

export default TrendingCarousel;

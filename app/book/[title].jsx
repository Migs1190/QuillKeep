import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "@/constants";
import useBook from "../../lib/useBook";
import { addToFavorites, removeFavorite } from "../../lib/appwrite";

const BookProfile = () => {
  const params = useLocalSearchParams();
  console.log(params);
  
  const { bookData, isFavorite, favoriteRecord, initBook } = useBook(
    params.isbn
  );
  const [loading, setLoading] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  if (!bookData)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );

  const favoriteHandler = async () => {
    setLoading(true);
    if (isFavorite) await removeFavorite(favoriteRecord.$id);
    else await addToFavorites(bookData.$id);

    initBook();
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 pt-16 mx-4">
      <View className="flex-row space-x-4">
        <View className="relative">
          <TouchableHighlight
            className="absolute top-3 right-3 z-10"
            underlayColor={"transparent"}
            onPress={favoriteHandler}
            disabled={loading}
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            <FontAwesome
              name={`${isFavorite ? "heart" : "heart-o"}`}
              size={30}
              color={`${isFavorite ? colors.SECONDARY : "white"}`}
            />
          </TouchableHighlight>
          <Image
            source={bookData.cover_l}
            contentFit="cover"
            className="w-36 h-60"
          />
        </View>
        <ScrollView
          className="h-60"
          style={{
            borderBottomWidth: showTitle ? 1 : 0,
            borderBottomColor: showTitle ? colors.SECONDARY : "transparent",
          }}
          overScrollMode="never"
        >
          <Text
            className="text-2xl font-robotocn mb-3"
            style={{ height: "auto" }}
            numberOfLines={showTitle ? 0 : 3}
            onPress={() => setShowTitle(!showTitle)}
          >
            {bookData.title}
          </Text>
          <Text className="text-sm font-robotolit text-gray-500">ISBN</Text>
          <Text className="font-robotocnit text-base text-secondary">
            {bookData.isbn}
          </Text>
          <Text className="text-sm font-robotolit text-gray-500">
            Authored by
          </Text>
          <Text className="font-robotocnit text-base text-secondary">
            {bookData.author}
          </Text>
          <Text className="text-sm font-robotolit text-gray-500">
            Published by
          </Text>
          <Text className="text-sm font-robotolit text-gray-500">
            <Text className="font-robotocnit text-base text-secondary">
              {bookData.publisher}
            </Text>{" "}
            in{" "}
            <Text className="font-robotocnit text-base text-secondary">
              {bookData.publishing_year}
            </Text>
          </Text>
        </ScrollView>
      </View>
      <View className="">
        <Text className="mt-6 mb-2 mx-auto text-2xl font-robotom text-gray-500">
          Summary
        </Text>
        <Text className="text-base font-robotolit text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus
          possimus, amet facere deserunt doloremque eos veritatis similique
          debitis dolores, consequuntur aut illum neque. Fugiat voluptates totam
          nihil soluta, unde quas enim repellendus corrupti distinctio libero?
          Autem, voluptas optio quas nisi modi quae doloremque obcaecati eveniet
          suscipit molestias, necessitatibus earum fugit.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default BookProfile;

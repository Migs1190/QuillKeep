import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import BookItem from "./bookItem";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const InfoBar = ({ title, data }) => {
  const [showBody, setShowBody] = useState(true);
  const bodyRef = useRef();

  return (
    <View className="w-full">
      <View className="flex-row justify-between items-center bg-secondary p-1">
        <Text className="text-white text-xl font-robotol">{title}</Text>
        <TouchableOpacity onPress={() => setShowBody(!showBody)}>
          <MaterialIcons
            name={showBody ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View
        className="bg-p_gray transition h-0 "
        style={{ height: showBody ? "auto" : 0, padding: showBody ? 10 : 0 }}
        ref={bodyRef}
      >
        <FlatList
          data={data ?? []}
          renderItem={({ item }) => <BookItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => <Text>No Books Uploaded yet...</Text>}
          horizontal
        />
      </View>
    </View>
  );
};

export default InfoBar;

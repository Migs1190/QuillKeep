import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { colors, styles } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Searchbar = ({ value, label, handleWrite = (f) => f }) => {
  return (
    <View
      className="h-14 bg-white flex-row rounded-lg my-2 border-[1px] border-gray-200"
      style={Platform.OS === "android" && styles.ShadowStyles.androidShadow}
    >
      <View className="flex-1">
        <TextInput
          value={value}
          className="px-4 h-full font-robotolit text-base"
          placeholder="Search for a book"
          onChangeText={(value) =>
            handleWrite((prev) => ({ ...prev, [label.toLowerCase()]: value }))
          }
        />
      </View>
      <TouchableOpacity className="px-4 py-2 justify-center items-center">
        <FontAwesome name="search" size={24} color={colors.SECONDARY} />
      </TouchableOpacity>
    </View>
  );
};

export default Searchbar;

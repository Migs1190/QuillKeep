import { View, Text } from "react-native";
import React from "react";
import { colors } from "@/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const TabIcon = ({ icon, focused, title }) => {
  return (
    <View className="items-center justify-center gap-1">
      <FontAwesome5
        name={icon}
        size={24}
        color={focused ? colors.SECONDARY : colors.SHADES.gray}
      />
      <Text
        className={`${
          focused ? "font-psemibold text-secondary" : "font-pregular"
        } text-xs`}
      >
        {title}
      </Text>
    </View>
  );
};

export default TabIcon;

import { StyleSheet } from "react-native";

const ShadowStyles = StyleSheet.create({
  androidShadow: {
    elevation: 6,
    shadowColor: "rgba(0, 0, 0, 0.4)",
  },
  iosShadow: {
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default {ShadowStyles};
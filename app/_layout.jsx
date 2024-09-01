import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GlobalProvider from "../context/GlobalProvider";
import { colors, images } from "../constants";

SplashScreen.preventAutoHideAsync();

const cacheImages = async () => {
  const cachedImages = Object.values(images).map((image) => {
    return Image.prefetch(image);
  });
  return Promise.all(cachedImages);
};

export default function RootLayout() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      await cacheImages();
      setIsLoaded(true);
    };
    loadAssets();
  }, []);

  const [fontsLoaded, error] = useFonts({
    "Roboto-Black":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c04002105947bd4/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-BlackItalic":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c0a00372500c843/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-Bold":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c100025e2e0d150/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-BoldCondensed":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c1500302269986d/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-BoldCondensedItalic":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c1b0030bfd2cb9d/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-BoldItalic":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c2200083fab8e1f/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-Condensed":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c270006230f05b7/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-CondensedItalic":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c3d001c00307778/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-Light":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c46002364ba3afb/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-LightItalic":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c4b000f73d70668/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-Medium":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c5b001ca4918eb9/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-MediumItalic":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c60003c93ef9fd0/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-Regular":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c65003068a77b37/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-Thin":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c6a0008f4571125/view?project=66c1378a00165aaa1784&mode=admin",
    "Roboto-ThinItalic":
      "https://cloud.appwrite.io/v1/storage/buckets/66d48bc8003dc3693d4f/files/66d48c6e00113d9ea600/view?project=66c1378a00165aaa1784&mode=admin",
  });

  useEffect(() => {
    if (error) console.error(error);
    if (fontsLoaded && isLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, isLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="search/[query]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="book/[title]" options={{ headerShown: false }} />
        </Stack>
        <StatusBar backgroundColor={colors.SECONDARY} />
      </SafeAreaProvider>
    </GlobalProvider>
  );
}

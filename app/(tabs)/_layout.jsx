import React from "react";
import { Tabs } from "expo-router";
import { icons, colors } from "@/constants";
import TabIcon from "../../components/TabIcon";

const tabsContent = [
  {
    name: "home",
    title: "Home",
    header: false,
    icon: "home",
  },
  {
    name: "profile",
    title: "Profile",
    header: false,
    icon: "user-alt",
  },
  {
    name: "notifications",
    title: "Notifications",
    header: false,
    icon: "bell",
  },
  {
    name: "settings",
    title: "Settings",
    header: false,
    icon: "cog",
  },
];

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: colors.SECONDARY,
        },
      }}
    >
      {tabsContent.map((tab, index) => (
        <Tabs.Screen
          name={tab.name}
          key={index}
          options={{
            // title: tab.title,
            headerShown: tab.header,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={tab.icon} focused={focused} title={tab.title} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;

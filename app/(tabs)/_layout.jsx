import { Colors } from "@/constants";
import { Tabs } from "expo-router";
import { useContext } from "react";
import TabIcon from "../../components/TabIcon";
import { GlobalContext } from "../../context/GlobalProvider";

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
		name: "search",
		title: "Search",
		header: false,
		icon: "search",
	},
	{
		name: "settings",
		title: "Settings",
		header: false,
		icon: "cog",
	},
];

const TabsLayout = () => {
	const { mode } = useContext(GlobalContext);
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "gray",
				tabBarStyle: {
					height: 60,
					backgroundColor: Colors[mode].background,
					borderTopWidth: 1,
					borderTopColor: Colors.tint,
				},
			}}
		>
			{tabsContent.map((tab) => (
				<Tabs.Screen
					name={tab.name}
					key={tab.name}
					options={{
						// title: tab.title,
						headerShown: tab.header,
						tabBarIcon: ({ focused }) => (
							<TabIcon
								icon={tab.icon}
								focused={focused}
								title={tab.title}
							/>
						),
					}}
				/>
			))}
		</Tabs>
	);
};

export default TabsLayout;

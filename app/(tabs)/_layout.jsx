import { Tabs } from "expo-router";
import TabIcon from "../../components/TabIcon";
import { colors } from "../../constants";

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

import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="Home"
                options={{
                    tabBarLabel: "Home",
                    tabBarLabelStyle: { color: "#C7B9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                             <FontAwesome name="tasks" size={24} color="#C7B9E8" />
                        ) : (
                            <FontAwesome name="tasks" size={24} color="black" />
                        )
                    }
                }}
            />
            <Tabs.Screen
                name="Calendar"
                options={{
                    tabBarLabel: "Calendar",
                    tabBarLabelStyle: { color: "#C7B9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return  focused ? (
                            <AntDesign name="calendar" size={24} color="#C7B9E8" />
                        ) : (
                            <AntDesign name="calendar" size={24} color="black" />
                        )
                    }    
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    tabBarLabel: "Profile",
                    tabBarLabelStyle: { color: "#C7B9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <MaterialCommunityIcons name="account-details" size={24} color="#C7B9E8" />
                        ) : (
                            <MaterialCommunityIcons name="account-details" size={24} color="black" />
                        )
                    }
                }}
            />
        </Tabs>
    )
}
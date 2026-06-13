import React, { useState } from "react";
import Onboarding from "../screens/Onboarding";
import FindStack from "./Navigation.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets, initialWindowMetrics } from 'react-native-safe-area-context';

import InputScreen from '../screens/InputScreen.js';
import ResultsScreen from '../screens/ResultScreen.js';
import LogScreen from '../screens/LogScreen.js';

const Tab = createBottomTabNavigator();

export default function NavTabs() {
    const [lastResult, setLastResult] = useState(null);
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#3d7e96',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarStyle: {
                    height: 65 + insets.bottom,
                    backgroundColor: '#fff',
                    borderTopColor: '#89c5fd',
                    borderTopWidth: 1,
                    paddingBottom: Math.max(insets.bottom, 10),
                    paddingTop: 6,

                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    paddingBottom: 17
                },
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;
                    if (route.name === 'Input') iconName = focused ? 'search' : 'search-outline';
                    if (route.name === 'Results') iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
                    if (route.name === 'Log') iconName = focused ? 'list' : 'list-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Input" component={InputScreen} />
            <Tab.Screen name="Results" component={ResultsScreen} />
            <Tab.Screen name="Log" component={LogScreen} />
        </Tab.Navigator>
    );
}
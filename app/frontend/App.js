import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets, initialWindowMetrics } from 'react-native-safe-area-context';
import { View } from 'react-native';
import InputScreen from './screens/InputScreen.js';
import ResultsScreen from './screens/ResultScreen.js';
import LogScreen from './screens/LogScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function FindStack({ lastResult, setLastResult }) {
    return (
        <Stack.Navigator
            initialRouteName="Input"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f3f4f6',
                },
                headerTintColor: '#1f2937',
                headerTitleStyle: { fontWeight: '600' },
            }}
        >
            <Stack.Screen name="Input" options={{ title: 'Blue Work' }}>
                {(props) => <InputScreen {...props} setLastResult={setLastResult} />}
            </Stack.Screen>
            <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Best Match' }} />
            <Stack.Screen name="Log" component={LogScreen} options={{ title: 'Agent Log' }} />
        </Stack.Navigator>
    );
}

function NavTabs() {
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
                    if (route.name === 'Find') iconName = focused ? 'search' : 'search-outline';
                    if (route.name === 'Results') iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
                    if (route.name === 'Records') iconName = focused ? 'list' : 'list-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Find">
                {(props) => <FindStack {...props} lastResult={lastResult} setLastResult={setLastResult} />}
            </Tab.Screen>
            <Tab.Screen name="Results">
                {(props) => <ResultsScreen {...props} lastResult={lastResult} />}
            </Tab.Screen>
            <Tab.Screen name="Records">
                {(props) => <LogScreen {...props} lastResult={lastResult} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default function App() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <NavigationContainer>
                    <NavTabs />
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets, initialWindowMetrics } from 'react-native-safe-area-context';

import Onboarding from '../screens/Onboarding.js';
import Option from '../screens/Option.js';
import WorkerForm from '../screens/WorkerForm.js';
import WorkerDashboard from '../screens/WorkerDashboard.js';
import NavTabs from './NavTabs.js';
const Stack = createStackNavigator();

export default function Navigation() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Onboarding" component={Onboarding} />
                        <Stack.Screen name="Option" component={Option} />
                        <Stack.Screen name='WorkerFrom' component={WorkerForm} />
                        <Stack.Screen name='WorkerDashboard' component={WorkerDashboard} />

                        <Stack.Screen name='NavTabs' component={NavTabs} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView >
    );
}


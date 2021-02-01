
import 'react-native-gesture-handler';
import React from 'react';
import HomeScreen from './src/screens/Main.js';
import SettingsScreen from './src/screens/SettingsScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GeneralScreen from './src/screens/GeneralScreen.js';
import { Icon } from 'react-native-elements';
import colors from './src/utils/colors.js';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const routeNames = {
    HOME: 'Visão diária',
    DAILY: 'Visão diária',
    GENERAL: 'Visão geral',
    SETTINGS: 'Configurações',
}

const TabNavigator = () => 
    <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            let iconMap = {
                'Visão diária': 'today',
                'Visão geral': 'calendar-view-day',
                'Configurações': 'settings',
            };
            iconName = iconMap[route.name];

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
        },
        })}
        tabBarOptions={{
            activeTintColor: colors.essence2,
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen name={routeNames.DAILY} component={HomeScreen} />
        <Tab.Screen name={routeNames.GENERAL} component={GeneralScreen} />
        <Tab.Screen name={routeNames.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Nick's Planner" component={TabNavigator}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
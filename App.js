
import 'react-native-gesture-handler';
import React from 'react';
import HomeScreen from './src/screens/Main.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Devotional planner" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';

export type RootStackParamList = {
    AuthLoadingScreen: undefined;
    MainTab: undefined;
    AuthTab: undefined;
};

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;

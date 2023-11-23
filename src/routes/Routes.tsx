import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import Home from '../views/Home';
import AddFood from '../views/AddFood';

const Stack = createNativeStackNavigator<RootStackParams>();

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="AddFood" component={AddFood} />
        </Stack.Navigator>
    </NavigationContainer>
)


export default Routes
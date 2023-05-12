import React, {useEffect, useState} from 'react';

import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/Screens/LoginScreen';

import HomeScreen from './src/Screens/HomeScreen';
import AddNotes from './src/Screens/AddNotes';
import Home from './src/Screens/Home';
import RegisterScreen from './src/Screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default ({children, theme}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, SetUser] = useState(undefined);

  const getUser = async () => {
    let val = await AsyncStorage.getItem('user');
    console.log(val);
    if (val) SetUser(JSON.parse(val));
  };
  useEffect(() => {
    getUser();
  }, []);
  
  

  return (
    <NavigationContainer>

        <Stack.Navigator
        initialRouteName={user?'Dashboard':'HOME'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HOME" component={Home} />
          <Stack.Screen name="Dashboard" component={HomeScreen} />
          <Stack.Screen name="AddNotes" component={AddNotes} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

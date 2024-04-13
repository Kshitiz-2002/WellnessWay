import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import  StartupScreen from './screens/StartupScreen'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen'
import NavigationScreen from './screens/NavigationScreen';
import AboutUsPage from './screens/AboutUs'
import CombinedRegistrationScreen from './screens/CombinedRegistrationScreen'

const App = () => {
  const Stack = createStackNavigator();
 
  const customTransition = ({ current }) => ({
    cardStyle: {   
      opacity: current.progress,
    },
  });
 
  return (   
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false, // Use this to hide the header
          cardStyleInterpolator: customTransition,
        }}
      > 
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="StartupScreen" component={StartupScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CombinedRegistrationScreen" component={CombinedRegistrationScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="NavigationScreen" component={NavigationScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AboutUsPage" component={AboutUsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

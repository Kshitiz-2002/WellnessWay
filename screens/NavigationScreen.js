import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Appbar } from 'react-native-paper';
import HealthScreen from './HealthdataScreen';
import PrescriptionScreen from './PrescriptionScreen';
import { useRoute } from '@react-navigation/native';
import RegistraionScreen from './NurseRegistrationScreen';
import HomeScreen from './HomeScreen';
import SecondHomeScreen from './SecondHomeScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();

const RoundedTab = ({ children, focused }) => {
  const theme = useTheme();
  const backgroundColor = focused ? '#4FC9BF' : 'transparent';

  return (
    <View
      style={{
        backgroundColor,
        borderRadius: 10,
        padding: 10,
        height: 40,
        paddingTop: 0, // Increase top padding
        paddingBottom: 0, // Reduce bottom padding
        alignSelf: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center content inside the tab
      }}>
      {children}
    </View>
  );
};



const NavigationScreen = () => {
  const route = useRoute();
  const { user } = route.params || {};

  const tabHeight = Platform.OS === 'ios' ? 70 : 70;
  const iconSize = Platform.OS === 'ios' ? 32 : 26;
  const marginBottom = Platform.OS === 'ios' ? 20 : 0;

  return (
    <View style={{ flex: 1, borderRadius: 25, overflow: 'hidden', margin: 20 }}>
      <Tab.Navigator
        shifting={true}
        labeled={false}
        barStyle={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          overflow: 'hidden',
          elevation: 10,
          height: tabHeight, 
        }}
        style={{ marginBottom: marginBottom, height: tabHeight }}>
        <Tab.Screen
          name="Home"
          component={() => <SecondHomeScreen user={user} />}
          options={{
            tabBarIcon: ({ focused }) => (
              <RoundedTab focused={focused}>
                <Image
                  source={require('../assets/home.png')}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    tintColor: focused ? 'black' : 'black',
                  }}
                />
              </RoundedTab>
            ),
          }}
        />
        <Tab.Screen
          name="Health"
          component={HealthScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <RoundedTab focused={focused}>
                <Image
                  source={require('../assets/heart-beat.png')}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    tintColor: focused ? 'black' : 'black',
                  }}
                />
              </RoundedTab>
            ),
          }}
        />
        <Tab.Screen
          name="Prescription"
          component={() => <PrescriptionScreen user={user} />}
          options={{
            tabBarIcon: ({ focused }) => (
              <RoundedTab focused={focused}>
                <Image
                  source={require('../assets/prescription.png')}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    tintColor: focused ? 'black' : 'black',
                  }}
                />
              </RoundedTab>
            ),
          }}
        />
        <Tab.Screen
          name="Doctor"
          component={RegistraionScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <RoundedTab focused={focused}> 
                <Image
                  source={require('../assets/ambulance.png')}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    tintColor: focused ? 'black' : 'black',
                  }}
                />
              </RoundedTab>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default NavigationScreen;

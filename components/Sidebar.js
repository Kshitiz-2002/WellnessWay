import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ isSidebarOpen, user }) => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('Home');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            navigation.navigate('LoginScreen'); 
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleOptionPress = (option) => {

    setSelectedOption(option);
    switch (option) {
      case 'Home':
        navigation.navigate('NavigationScreen', { user: user });
        break;
      case 'Combined Registration':
        navigation.navigate('CombinedRegistrationScreen', { user: user }); 
        break;
      case 'About Us':
        navigation.navigate('AboutUsPage');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        position: 'absolute',
        bottom: 80,
        right: 0,
        height: '80%',
        width: '40%',
        backgroundColor: 'white', 
        borderRadius: 20, 
        zIndex: 100,
      }}>
      <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            backgroundColor: selectedOption === 'Home' ? '#D4F0F0' : 'white',
            alignItems: 'center',
            marginTop: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onPress={() => handleOptionPress('Home')}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 6, color: '#4FC9BF' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectedOption === 'Combined Registration' ? '#D4F0F0' : 'white',
            alignItems: 'center',
            marginTop: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onPress={() => handleOptionPress('Combined Registration')}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 6, color: '#4FC9BF', }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectedOption === 'About Us' ? '#D4F0F0' : 'white',
            alignItems: 'center',
            marginTop: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onPress={() => handleOptionPress('About Us')}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 6, color: '#4FC9BF' }}>About Us</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#FFDADA', 
          paddingVertical: 12,
          borderRadius: 10,
          width: '90%',
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: 'red', 
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          LOGOUT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Sidebar;

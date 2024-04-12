import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ isSidebarOpen, user }) => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('Home');

  const handleLogout = () => {
    // Show confirmation dialog
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
            navigation.navigate('LoginScreen'); // Replace 'Login' with the actual name of your login screen
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleOptionPress = (option) => {
    // Set the selected option and navigate to the respective screen
    setSelectedOption(option);
    switch (option) {
      case 'Home':
        navigation.navigate('NavigationScreen', { user: user });
        break;
      case 'Nurse Registration':
        navigation.navigate('NurseRegistrationScreen'); // Replace with your nurse registration screen
        break;
      case 'Doctor Registration':
        navigation.navigate('DoctorRegistrationScreen'); // Replace with your nurse registration screen
        break;
      case 'Pathalogy Registration':
        navigation.navigate('PathalogyRegistrationScreen'); // Replace with your nurse registration screen
        break;
      case 'Physiotheraphy Registration':
        navigation.navigate('PhysiotheraphyRegistrationScreen'); // Replace with your nurse registration screen
        break;
      case 'About Us':
        navigation.navigate('AboutUsPage'); // Replace with your about us screen
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
        backgroundColor: 'white', // Set your transparent background color
        borderRadius: 20, // Set the border radius
        zIndex: 100,
      }}>
      <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%', alignItems: 'center' }}>
        {/* Your sidebar content goes here */}
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
            backgroundColor: selectedOption === 'Nurse Registration' ? '#D4F0F0' : 'white',
            alignItems: 'center',
            marginTop: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onPress={() => handleOptionPress('Nurse Registration')}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 6, color: '#4FC9BF', }}>Nurse Reg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectedOption === 'Doctor Registration' ? '#D4F0F0' : 'white',
            alignItems: 'center',
            marginTop: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onPress={() => handleOptionPress('Doctor Registration')}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 6, color: '#4FC9BF', }}>Doc Reg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectedOption === 'Pathalogy Registration' ? '#D4F0F0' : 'white',
            alignItems: 'center',
            marginTop: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onPress={() => handleOptionPress('Pathalogy Registration')}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 6, color: '#4FC9BF', }}>Pathalogy Reg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectedOption === 'Physiotheraphy Registration' ? '#D4F0F0' : 'white',
            alignItems: 'center',
            marginTop: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onPress={() => handleOptionPress('Physiotheraphy Registration')}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 6, color: '#4FC9BF', }}>Physio Reg</Text>
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

      {/* Logout button with confirmation */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#FFDADA', // Light red background
          paddingVertical: 12,
          borderRadius: 10,
          width: '90%',
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: 'red', // Red text color
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

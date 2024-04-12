import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StratupScreen = () => {
  const navigation = useNavigation();
  const handleGetStarted = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <View style={styles.imgBack}>
        <Image
          style={styles.famImg}
          source={require('../assets/StartupImage.png')}
        />
        <Text style={styles.healthText}>Take Care of Your Health</Text>
 
        <Text style={styles.servicesText}>
          and here we are to help you by providing the best services
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.submitBox} onPress={handleGetStarted}>
          <Text style={styles.submitText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#E9EBF6', // Add your color
    padding: 15,
  },
  imgBack: {
    flex: 0.8,
    width: 330,
    height: 574,
    alignSelf: 'center',
    backgroundColor: '#FFF7F7', // Add your color
    borderRadius: 5,
    marginTop: 15,
  },
  famImg: {
    width: 245,
    height: 304,
    marginVertical: 54,
    alignSelf: 'center',
  },
  healthText: {
    width: 251.4,
    height: 56.4,
    fontSize: 17,
    color: '#000000', // Add your color
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  servicesText: {
    width: 272.4,
    height: 92.4,
    fontSize: 17,
    color: '#9A9A9A', // Add your color
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  bottomContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  submitBox: {
    width: 320,
    height: 65,
    backgroundColor: '#4FC9BF', // Add your color
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitText: {
    fontSize: 30,
    color: '#FFFFFF', // Add your color
    fontWeight: 'bold',
  },
});

export default StratupScreen;

import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    });

    animation.start(() => {
      // Navigate to LoginScreen after animation completes
      navigation.replace('StartupScreen');
    });

    return () => animation.stop();
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/WellnessWayLogo.png')} // Replace with your splash image
        style={[styles.splashImage, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4FC9BF', // Adjust the background color as needed
  },
  splashImage: {
    width: 400, // Adjust the width as needed
    height: 400, // Adjust the height as needed
  },
});

export default SplashScreen;

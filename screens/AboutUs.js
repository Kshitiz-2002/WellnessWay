import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our app! We are dedicated to providing you with the best experience and service.
        Feel free to explore and let us know how we can make your experience even better.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4FC9BF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default AboutUsPage;

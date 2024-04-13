import React from 'react';
import { View, Image, Text, StyleSheet, Platform } from 'react-native';

const ModernCard = ({ imageSource, text, backColor }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#4FC9BF",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3, 
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 16 : 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%', 
  },
  textContainer: {
    padding: 10, 
  },
  text: {
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    fontWeight: 'bold',
    color: 'white', 
    textAlign: 'center', 
  },
});

export default ModernCard;

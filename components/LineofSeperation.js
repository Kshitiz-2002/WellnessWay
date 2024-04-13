import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, ClipPath, G } from 'react-native-svg';

const LineSeparator = () => {
  return (
    <View style={styles.container}>
      <Svg width={82} height={1} viewBox="0 0 82 1">
        <G>
          <ClipPath id="clip0">
            <Path d="M0.5 0.5H81.5H0.5Z" />
          </ClipPath>
          <Path
            d="M0.5 0.5H81.5H0.5Z"
            stroke="#888888"
            strokeWidth={1}
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 82,
    height: 1,
  },
});

export default LineSeparator;

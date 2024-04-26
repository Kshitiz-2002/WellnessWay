import React from 'react';
import { View, TextInput } from 'react-native';

const SearchPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
      }}
    >
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderColor: '#E2E8F0',
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          fontSize: 16,
          color: '#2D3748',
        }}
        placeholder="Search..."
        placeholderTextColor="#A0AEC0"
      />
    </View>
  );
};

export default SearchPage;

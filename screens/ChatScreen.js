import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, { id: messages.length + 1, text: inputText }]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={{ padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 5 }}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1, padding: 10 }}
          inverted
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 8, marginRight: 10 }}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={{ backgroundColor: 'blue', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20 }} onPress={sendMessage}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

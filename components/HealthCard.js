import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from "react-native";

const HealthCard = ({ style, title, initialValue }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const [pastRecords, setPastRecords] = useState([]);

  const handleAddRecord = () => {
    if (value.trim() !== "") {
      setPastRecords([...pastRecords, value]); // Add value to past records
      setValue(pastRecords[pastRecords.length - 1]); // Update value displayed in the card with the last updated value
      setModalVisible(false); // Close the modal after adding record
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 16 }}>{value}</Text>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              Enter {title}
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
              }}
              placeholder={`${title}`}
              value={value}
              onChangeText={(text) => setValue(text)}
            />
            <Button title="Add Record" onPress={handleAddRecord} />
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                Past Records:
              </Text>
              {pastRecords.map((record, index) => (
                <Text key={index}>{`${title} Record ${index + 1}: ${record}`}</Text>
              ))}
            </View>
            <Button
              title="Close Modal"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const DiseasePredictionCard = ({ style }) => {
  return (
    <View
      style={{
        backgroundColor: "#4FC9BF",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#FFFFFF",
        }}
      >
        Disease Prediction
      </Text>
      <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
        No Disease Detected
      </Text>
    </View>
  );
};

export { HealthCard, DiseasePredictionCard };

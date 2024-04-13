import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from "react-native";

const HealthCard = ({ style, title, initialHeartRate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [heartRate, setHeartRate] = useState(initialHeartRate || "");
  const [pastRecords, setPastRecords] = useState([]);

  const handleAddRecord = () => {
    if (heartRate.trim() !== "") {
      setPastRecords([...pastRecords, heartRate]); // Add heart rate to past records
      setHeartRate(heartRate); // Update heart rate displayed in the card
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
      <Text style={{ fontSize: 16 }}>{heartRate} mg/dL</Text>

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
              Enter Heart Rate
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
              }}
              placeholder="Heart Rate (mg/dL)"
              value={heartRate}
              onChangeText={(text) => setHeartRate(text)}
              keyboardType="numeric"
            />
            <Button title="Add Record" onPress={handleAddRecord} />
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                Past Records:
              </Text>
              {pastRecords.map((record, index) => (
                <Text key={index}>{`Heart Rate Record ${
                  index + 1
                }: ${record} mg/dL`}</Text>
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

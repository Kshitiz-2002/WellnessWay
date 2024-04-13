import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HealthCard = ({ style, title, initialValue }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const [pastRecords, setPastRecords] = useState([]);

  const handleAddRecord = () => {
    if (value.trim() !== "") {
      setPastRecords([...pastRecords, value]); 
      setValue(pastRecords[pastRecords.length - 1]); 
      setModalVisible(false); 
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
                <Text key={index}>{`${title} Record ${
                  index + 1
                }: ${record}`}</Text>
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
  const [currentDisease, setCurrentDisease] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [symptoms, setSymptoms] = useState([""]);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [diseaseHistory, setDiseaseHistory] = useState([]);

  const handlePredictDisease = () => {
    const predictedDisease = "Some Disease"; 
    setCurrentDisease(predictedDisease);

    const updatedHistory = [
      ...diseaseHistory,
      { disease: predictedDisease, symptoms: symptoms },
    ];
    setDiseaseHistory(updatedHistory);

    setModalVisible(false);
  };

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, ""]);
  };

  const handleSymptomChange = (text, index) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = text;
    setSymptoms(updatedSymptoms);
  };

  const handleDeleteSymptom = (index) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms.splice(index, 1);
    setSymptoms(updatedSymptoms);
  };

  const handleViewHistory = () => {
    setHistoryModalVisible(true);
  };

  const handlePredictModal = () => {
    setModalVisible(true);
  };

  return (
    <View
      style={{
        backgroundColor: "#4FC9BF",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        flexDirection: "row",
        ...style,
      }}
    >
      <View style={{ flex: 4, alignItems: "flex-start" }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#FFFFFF",
          }}
        >
          Current Disease
        </Text>
        {currentDisease ? (
          <Text style={{ fontSize: 20, color: "#FFFFFF", marginTop: 8 }}>
            {currentDisease}
          </Text>
        ) : (
          <Text style={{ fontSize: 20, color: "#FFFFFF", marginTop: 8 }}>
            No Disease yet
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 10,
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          onPress={handlePredictModal}
          style={{
            backgroundColor: "white",
            alignItems: "center",
            width: "100%",
            borderRadius: 10,
            paddingVertical: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 16, color: "#4FC9BF" }}>Predict</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                width: "80%",
                padding: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>
                  Enter Symptoms
                </Text>
                <FontAwesome
                  name="plus"
                  size={24}
                  color="black"
                  onPress={handleAddSymptom}
                />
              </View>
              {symptoms.map((symptom, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                  key={index}
                >
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "#4FC9BF",
                      borderWidth: 1,
                      flex: 1,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                    placeholder={`Symptom ${index + 1}`}
                    value={symptom}
                    onChangeText={(text) => handleSymptomChange(text, index)}
                  />
                  <View style={{flexDirection:'column'}}>
                    <TouchableOpacity
                      onPress={() => handleDeleteSymptom(index)}
                      style={{
                        flex:1,
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome
                        name="trash"
                        size={24}
                        color="red"
                        style={{ marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <Button title="Predict Disease" onPress={handlePredictDisease} />
              <Button
                title="Close Modal"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={handleViewHistory}
          style={{
            backgroundColor: "white",
            alignItems: "center",
            marginTop: 10,
            width: "100%",
            borderRadius: 10,
            paddingVertical: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 16, color: "#4FC9BF" }}>History</Text>
        </TouchableOpacity>

        
        <Modal
          visible={historyModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setHistoryModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                width: "80%",
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Disease History
              </Text>
              {diseaseHistory.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {item.disease}
                  </Text>
                  {item.symptoms.map((symptom, index) => (
                    <Text key={index} style={{ marginBottom: 3 }}>
                      {symptom}
                    </Text>
                  ))}
                </View>
              ))}
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginTop: 10,
                }}
                onPress={() => setHistoryModalVisible(false)}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Close Modal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export { HealthCard, DiseasePredictionCard };

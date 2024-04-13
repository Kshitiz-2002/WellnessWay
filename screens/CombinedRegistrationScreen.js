import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

const CombinedRegistrationScreen = () => {
  const [registrationType, setRegistrationType] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [workingHours, setWorkingHours] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [description, setDescription] = useState("");

  const handleRegister = () => {
    
    console.log("Registering as:", registrationType);
    console.log("Working Hours:", workingHours);
    console.log("Specialty:", specialty);
    console.log("Description:", description);
    
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (type) => {
    setRegistrationType(type);
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold", textAlign: "center" }}>
            Registration
          </Text>
          <View
            style={{
              borderColor: "#4FC9BF",
              borderWidth: 1,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                paddingVertical: 15,
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={toggleDropdown}
            >
              <Text style={{ fontSize: 16, color: "#4FC9BF" }}>
                {registrationType || "Select Type"}
              </Text>
            </TouchableOpacity>
            
            {dropdownVisible && (
              <View style={{ backgroundColor: "#fff" }}>
                <TouchableOpacity
                  style={{ paddingVertical: 15, paddingHorizontal: 20 }}
                  onPress={() => handleOptionSelect("Nurse")}
                >
                  <Text style={{ fontSize: 16, color: "#333" }}>Nurse</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 15, paddingHorizontal: 20 }}
                  onPress={() => handleOptionSelect("Physiotherapist")}
                >
                  <Text style={{ fontSize: 16, color: "#333" }}>Physiotherapist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 15, paddingHorizontal: 20 }}
                  onPress={() => handleOptionSelect("Pharmacist")}
                >
                  <Text style={{ fontSize: 16, color: "#333" }}>Pharmacist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 15, paddingHorizontal: 20 }}
                  onPress={() => handleOptionSelect("Pathologist")}
                >
                  <Text style={{ fontSize: 16, color: "#333" }}>Pathologist</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {registrationType && (
            <View style={{ marginTop: 20 }}>
              <TextInput
                placeholder="Working Hours"
                value={workingHours}
                onChangeText={setWorkingHours}
                style={{
                  fontSize: 16,
                  marginBottom: 15,
                  borderWidth: 1,
                  borderColor: "#4FC9BF",
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
              />
              <TextInput
                placeholder="Specialty"
                value={specialty}
                onChangeText={setSpecialty}
                style={{
                  fontSize: 16,
                  marginBottom: 15,
                  borderWidth: 1,
                  borderColor: "#4FC9BF",
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
              />
              {/* <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                style={{
                    fontSize: 16,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderColor: "#4FC9BF",
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                }}
              /> */}
            </View>
          )}
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: "#4FC9BF",
              paddingVertical: 15,
              borderRadius: 10,
              marginTop: 20,
              alignItems: "center",
            }}
            disabled={registrationType === null}
          >
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CombinedRegistrationScreen;

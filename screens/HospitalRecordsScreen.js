import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

const HospitalCard = ({ name, address, phonenum }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
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
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
      <Text>{address}</Text>
      <Text>Contact: {phonenum}</Text>
    </TouchableOpacity>
  );
};

const HospitalRecords = ({ user }) => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch(
      `https://dbfb539b-1621-4585-8f4e-2729f136a9b5-00-udz7gviutoov.kirk.replit.dev/hospitals?city=${user.city}&state=${user.state}`
    )
      .then((response) => response.json())
      .then((data) => {
        setHospitals(data.hospitals);
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
      });
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 0.9 }}>
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: Platform.OS === "ios" ? 40 : 32,
            marginTop: Platform.OS === "ios" ? 5 : 2,
            fontWeight: "700",
          }}
        >
          Hospitals Nearby
        </Text>
      </View>
      <ScrollView style={{ flex: 3 }} showsVerticalScrollIndicator={false}>
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital._id} 
            name={hospital.name}
            address={hospital.address}
            phonenum={hospital.phonenum}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalRecords;

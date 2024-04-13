import React, { useState } from "react";
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

const HospitalCard = ({ name, address, rating }) => {
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
      <Text>Rating: {rating}</Text>
    </TouchableOpacity>
  );
};

const HospitalRecords = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
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
      <ScrollView
        style={{ flex: 3, }}
        showsVerticalScrollIndicator={false} 
      >
        <HospitalCard
          name="Hospital 1"
          address="123 Main Street"
          rating={4.5}
        />
        <HospitalCard
          name="Hospital 2"
          address="456 Elm Street"
          rating={4.0}
        />
        {/* Add more HospitalCard components as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalRecords;

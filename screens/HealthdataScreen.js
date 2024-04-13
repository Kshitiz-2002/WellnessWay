import React from "react";
import { View, Text, SafeAreaView, Platform } from "react-native";
import { HealthCard, DiseasePredictionCard } from "../components/HealthCard";

const HealthScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, zIndex: 1 }}>
      <View
        style={{
          flex: 0.25,
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
          Health Data
        </Text>
      </View>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <HealthCard title={"Heart Rate"} initialValue={"Initial Heart Rate"} />
        <HealthCard title={"Blood Oxygen Saturation"} initialValue={"Initial Blood Oxygen Saturation"} />
      </View>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <HealthCard title={"Cholesterol Level"} initialValue={"Initial Cholesterol Level"} />
        <HealthCard title={"Blood Sugar Level"} initialValue={"Initial Blood Sugar Level"} />
      </View>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <HealthCard title={"Glucose Level"} initialValue={"Initial Glucose Level"} />
        <HealthCard title={"Blood Pressure Level"} initialValue={"Initial Blood Pressure Level"} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <DiseasePredictionCard style={{ height: 125 }} />
      </View>
    </SafeAreaView>
  );
};

export default HealthScreen;
  
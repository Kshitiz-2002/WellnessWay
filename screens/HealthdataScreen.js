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
        <HealthCard title={"Heart Rate"} initialValue={"50 mg/L"} />
        <HealthCard title={"Blood Oxygen Saturation"} initialValue={"50 mg/L"} />
      </View>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <HealthCard title={"Cholesterol Level"} initialValue={"50 mg/L"} />
        <HealthCard title={"Blood Sugar Level"} initialValue={"50 mg/L"} />
      </View>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <HealthCard title={"Glucose Level"} initialValue={"50 mg/L"} />
        <HealthCard title={"Blood Pressure Level"} initialValue={"50 mg/L"} />
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

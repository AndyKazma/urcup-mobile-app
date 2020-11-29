
import React from "react";
import { View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Routes } from "./app/routes";

const App = () => {
  return (
      <View style={{ flex: 1 }}>
        <Routes />
        <FlashMessage position="top" />
      </View>
  );
};

export default App;

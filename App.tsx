import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/context/ThemeContext";
import { SavedJobProvider } from "./src/context/SavedJobContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SavedJobProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SavedJobProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList, TabParamList } from "../types";
import { useTheme } from "../context/ThemeContext";
import JobFinderScreen from "../screens/JobFinder/JobFinderScreen";
import SavedJobsScreen from "../screens/SavedJobs/SavedJobsScreen";
import AppliedJobsScreen from "../screens/AppliedJobs/AppliedJobsScreen";
import ApplicationFormScreen from "../screens/ApplicationForm/ApplicationFormScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{ marginRight: 16, padding: 4 }}
    >
      <Ionicons
        name={isDark ? "sunny-outline" : "moon-outline"}
        size={22}
        color={isDark ? "#FFD700" : "#2D3748"}
      />
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerRight: () => <ThemeToggleButton />,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textTertiary,
      }}
    >
      <Tab.Screen
        name="JobFinder"
        component={JobFinderScreen}
        options={{
          title: "Job Finder",
          tabBarLabel: "Find Jobs",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          title: "Saved Jobs",
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AppliedJobs"
        component={AppliedJobsScreen}
        options={{
          title: "Applied Jobs",
          tabBarLabel: "Applied",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ApplicationForm"
        component={ApplicationFormScreen}
        options={{
          title: "Apply for Job",
          headerRight: () => <ThemeToggleButton />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

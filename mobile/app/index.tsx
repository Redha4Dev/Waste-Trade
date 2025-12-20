// In app/index.js

import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider"; // Adjust path if necessary

const Index = () => {
  const { user, loading } = useAuth();
  console.log(user);

  // 1. While the AuthProvider is checking for a token, show a loading spinner.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2. If loading is done and there is NO user, redirect to the login screen.
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  } else {
    return <Redirect href="/(buyer)" />;
  }


  // Fallback: If the user has an unknown role, send them to a default place.
  // For now, we can send them back to login.
  return <Redirect href="/(auth)/login" />;
};

export default Index;

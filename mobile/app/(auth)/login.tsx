import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import api from "../../utils/axios"
import { useAuth } from "providers/AuthProvider";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      const res = await api.post("/api/authentication/login", {
        email,
        password,
      });


    //   // Redirect based on role
    //   if (userRole === "seller") {
    //     router.replace("/(seller)");
    //   } else {
    //     router.replace("/(buyer)");
    //   }
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      Alert.alert("Login Failed", "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8E9]">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          className="px-8 py-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center mb-10">
            <View className="w-16 h-16 bg-[#367C3D] rounded-2xl items-center justify-center shadow-lg mb-6">
              <FontAwesome5 name="recycle" size={32} color="white" />
            </View>
            <Text className="text-3xl font-extrabold text-gray-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-base text-gray-500">
              Log in to start trading waste.
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <View className="flex-row items-center bg-white h-14 rounded-full px-5 mb-4 border border-transparent">
              <Feather
                name="mail"
                size={20}
                color="#A0A5A9"
                className="mr-4"
              />
              <TextInput
                className="flex-1 text-base text-black h-full ml-3"
                placeholder="Enter email or phone"
                placeholderTextColor="#A0A5A9"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="flex-row items-center bg-white h-14 rounded-full px-5 mb-2 border border-transparent">
              <Feather name="lock" size={20} color="#A0A5A9" />
              <TextInput
                className="flex-1 text-base text-black h-full ml-3"
                placeholder="Enter password"
                placeholderTextColor="#A0A5A9"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#A0A5A9"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="self-end mb-6 mt-2">
              <Text className="text-gray-500 font-semibold">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#367C3D] h-14 rounded-full items-center justify-center shadow-md"
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-white text-lg font-bold">
                {loading ? "Logging in..." : "Log In"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-8 mt-2">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-400 text-sm">Or continue with</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Socials */}
          <View className="flex-row justify-center space-x-4 mb-10 gap-4">
            <TouchableOpacity className="w-14 h-14 bg-white rounded-full items-center justify-center shadow-sm">
              <FontAwesome5 name="facebook-f" size={20} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 bg-white rounded-full items-center justify-center shadow-sm">
              <FontAwesome5 name="apple" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center">
            <Text className="text-gray-500 text-base">New to Wasto? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <Text className="text-black font-extrabold text-base">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const [role, setRole] = useState('Seller');

  return (
    <SafeAreaView className="flex-1 bg-[#EFF6F3]">
      <StatusBar barStyle="dark-content" />
      
      {/* Header Bar */}
      <View className="flex-row items-center justify-between px-5 py-3">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-[800] tracking-widest text-[#1A1A1A]">WASTO</Text>
        <View className="w-6" /> 
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Title Section */}
          <Text className="text-[32px] font-[800] text-black mt-5 mb-2 tracking-tighter">
            Join the Loop
          </Text>
          <Text className="text-base text-[#5A6B65] mb-6 leading-6">
            Connect with buyers and sellers near you.
          </Text>

          {/* Role Selector */}
          <View className="mb-2">
            <Text className="text-sm font-[600] text-black uppercase">Select Role</Text>
          </View>
          <View className="flex-row bg-white rounded-[30px] p-2 mb-5 h-[55px]">
            <TouchableOpacity
              className={`flex-1 justify-center items-center rounded-[25px] ${role === 'Seller' ? 'bg-[#367C3D]' : ''}`}
              onPress={() => setRole('Seller')}
            >
              <Text className={`text-base font-[600] ${role === 'Seller' ? 'text-white' : 'text-[#5A6B65]'}`}>
                Seller
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 justify-center items-center rounded-[25px] ${role === 'Buyer' ? 'bg-[#367C3D]' : ''}`}
              onPress={() => setRole('Buyer')}
            >
              <Text className={`text-base font-[600] ${role === 'Buyer' ? 'text-white' : 'text-[#5A6B65]'}`}>
                Buyer
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <InputField label="Full Name" placeholder="e.g., Jane Doe" />
          <InputField label="Email Address" placeholder="name@example.com" keyboardType="email-address" />
          <InputField label="Phone Number" placeholder="+1 (555) 000-0000" keyboardType="phone-pad" />
          <InputField label="Password" placeholder="........" secureTextEntry={true} />

          {/* Location Input with Icon */}
          <View className="mb-[18px]">
            <Text className="text-sm font-[600] text-black mb-2">Location</Text>
            <View className="flex-row items-center bg-white h-[55px] rounded-[30px] px-5">
              <TextInput
                className="flex-1 text-base text-black h-full"
                placeholder="Set Pickup/Delivery Location"
                placeholderTextColor="#A0A5A9"
              />
              <Feather name="crosshair" size={22} color="#555" className="ml-2" />
            </View>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity className="bg-[#367C3D] flex-row h-[60px] rounded-[30px] justify-center items-center mt-5 mb-5 shadow-sm">
            <Text className="text-white text-lg font-[700] mr-2">Create Account</Text>
            <Feather name="arrow-right" size={20} color="#FFF" />
          </TouchableOpacity>

          {/* Footer Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-sm text-[#666]">Already have an account? </Text>
            <TouchableOpacity>
              <Text className="text-sm text-black font-[800]">Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const InputField = ({ label, placeholder, secureTextEntry, keyboardType }) => (
  <View className="mb-[18px]">
    <Text className="text-sm font-[600] text-black mb-2">{label}</Text>
    <TextInput
      className="bg-white h-[55px] rounded-[30px] px-5 text-base text-black border border-transparent focus:border-[#367C3D]"
      placeholder={placeholder}
      placeholderTextColor="#A0A5A9"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  </View>
);
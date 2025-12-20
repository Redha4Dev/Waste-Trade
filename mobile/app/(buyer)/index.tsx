import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from '@expo/vector-icons';
import { getAllListings, Listing } from 'services/listing';

const categories = [
  { id: 1, name: 'Recycle', icon: 'recycle', color: '#367C3D', type: 'FontAwesome5', bg: '#E8F5E9' },
  { id: 2, name: 'Hazardous', icon: 'warning', color: '#F59E0B', type: 'Ionicons', bg: '#FEF3C7' },
  { id: 3, name: 'Const.', icon: 'tools', color: '#3B82F6', type: 'FontAwesome5', bg: '#DBEAFE' },
  { id: 4, name: 'Organic', icon: 'leaf', color: '#10B981', type: 'FontAwesome5', bg: '#D1FAE5' },
];

export default function HomeScreen() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllListings()
      .then(setListings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F7FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

      <ScrollView showsVerticalScrollIndicator={false} className="px-5 pt-4 pb-20">

        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <View className="ml-3">
              <Text className="text-gray-500 text-xs font-semibold">
                Good Morning,
              </Text>
              <Text className="text-gray-900 text-lg font-bold">
                Alex Johnson
              </Text>
            </View>
          </View>

          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
            <Ionicons name="notifications-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-white h-12 rounded-full px-4 mb-6 shadow-sm border border-gray-200">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search plastic, metal, glass..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-gray-900 text-base"
          />
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 pl-1">
          {['All', 'Plastic', 'Metal', 'Paper', 'E-Waste'].map((filter, index) => (
            <TouchableOpacity
              key={filter}
              className={`px-6 py-2 rounded-full mr-3 border ${
                index === 0
                  ? 'bg-[#367C3D] border-[#367C3D]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`font-semibold ${index === 0 ? 'text-white' : 'text-gray-600'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 text-xl font-bold">Categories</Text>
          <TouchableOpacity>
            <Text className="text-[#367C3D] font-semibold">See All</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row  justify-between mb-8 px-2">
          {categories.map((cat) => (
            <View key={cat.id} className=" items-center">
              <TouchableOpacity
                className="w-16  h-16  rounded-2xl items-center justify-center mb-2 shadow-sm"
                //style={{ backgroundColor: cat.bg }}
              >
                {cat.type === 'FontAwesome5' ? (
                  <FontAwesome5 name={cat.icon} size={24} color={cat.color} />
                ) : (
                  <Ionicons name={cat.icon} size={28} color={cat.color} />
                )}
              </TouchableOpacity>
              <Text className="text-gray-600 text-xs font-medium">{cat.name}</Text>
            </View>
          ))}
        </View>

        {/* Listings */}
        <Text className="text-gray-900 text-xl font-bold mb-4">
          Nearby Listings
        </Text>

        {loading ? (
          <Text className="text-gray-400 text-center mt-10">
            Loading listings...
          </Text>
        ) : (
          <View className="gap-4">
            {listings.map((item) => (
              <View
                key={item._id ?? item.id}
                className="flex-row bg-white p-3 rounded-2xl items-center shadow-sm border border-gray-100"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-20 h-20 rounded-xl bg-gray-100"
                />

                <View className="flex-1 ml-3">
                  <Text className="text-gray-900 font-bold text-base">
                    {item.title}
                  </Text>

                  <Text className="text-gray-400 text-xs mb-2">
                    {item.distance} • {item.seller}
                  </Text>

                  <View className="flex-row items-center justify-between">
                    <Text className="text-[#367C3D] font-bold text-lg">
                      {item.price}
                      <Text className="text-gray-500 text-xs"> /kg</Text>
                    </Text>

                    <TouchableOpacity className="w-10 h-10 bg-[#367C3D] rounded-xl items-center justify-center">
                      <MaterialCommunityIcons name="cart-outline" size={22} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

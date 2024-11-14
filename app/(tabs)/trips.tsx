import Ionicons from '@expo/vector-icons/Ionicons';
import 'react';

import { Clock, MapPin } from 'lucide-react-native';

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const trips = () => {


const tripsData = [
    {
      id: 1,
      date: "May 15, 2023",
      time: "6:30 AM",
      source: "Maastricht",
      destination: "Rotterdam",
      fare: "$15.50",
      status: "completed",
      rating: 5,
    },
    {
        id: 1,
        date: "Nov 14, 2024",
        time: "5:30 PM",
        source: "Maastricht",
        destination: "Rotterdam",
        fare: "$15.50",
        status: "ongoing",
        rating: 5,
      },
      {
        id: new Date(),
        date: "Jan 15, 2025",
        time: "2:30 PM",
        source: "Maastricht",
        destination: "Rotterdam",
        fare: "$15.50",
        state: "planned",
        rating: 5,
      },
  ]

    return (
        <ScrollView className="flex-1 px-4 py-8">
        <Text className="text-2xl font-bold mb-6">Your Trips</Text>
        <View className="space-y-4">
          {tripsData.map((trip, i) => (
            <View key={i} className="bg-white rounded-lg shadow-md p-4">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-lg font-semibold">{trip.date}</Text>
                  <View className="flex-row items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <Text className="text-sm text-gray-500">{trip.time}</Text>
                  </View>
                </View>
                <TouchableOpacity className="h-8 w-8 items-center justify-center" aria-label="Trip options">
                </TouchableOpacity>
              </View>
              <View className="h-px bg-gray-200 my-4" />
              <View className="space-y-2">
                <View className="flex-row items-start">
                  <MapPin className="w-5 h-5 mr-2 text-green-500 mt-0.5" />
                  <View>
                    <Text className="font-medium">Pickup</Text>
                    <Text className="text-sm text-gray-500">{trip.source}</Text>
                  </View>
                </View>
                <View className="flex-row items-start">
                  <MapPin className="w-5 h-5 mr-2 text-red-500 mt-0.5" />
                  <View>
                    <Text className="font-medium">Drop-off</Text>
                    <Text className="text-sm text-gray-500">{trip.destination}</Text>
                  </View>
                </View>
              </View>
              <View className="h-px bg-gray-200 my-4" />
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="font-semibold">{trip.fare}</Text>
                  <Text className="text-sm text-gray-500">{trip.status}</Text>
                </View>
                {trip.rating && (
                  <View className="flex-row items-center">
                    <Ionicons className="w-4 h-4 text-yellow-400 mr-1" name='star' />
                    <Text className="text-sm font-medium">{trip.rating}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity className="bg-white border border-gray-300 rounded-md py-2 px-4 mt-6">
          <Text className="text-center font-semibold">Load More Trips</Text>
        </TouchableOpacity>
      </ScrollView>
    );
    
}

export default trips;

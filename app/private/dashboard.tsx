import { ScrollView, View } from "react-native";

import { Overview } from "@/components/overview";

export default function Dashboard() {
  return (
    <ScrollView>
      <View className="flex w-full items-center min-h-screen bg-[#f2f2f2]">
        <Overview />
      </View>
    </ScrollView>
  )
}
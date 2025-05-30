import { View, ScrollView } from "react-native";
import { RegisterForm } from "@/components/register-form";
import Toast from "react-native-toast-message";

export default function Register({ navigation }: any) {
  return (
    <ScrollView>
      <View className="min-h-screen justify-center items-center bg-white">
        <RegisterForm navigation={navigation} />
      </View>

      <Toast />
    </ScrollView>
  );
}

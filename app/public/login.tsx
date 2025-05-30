import { View, ScrollView } from "react-native";
import { LoginForm } from "@/components/login-form";
import Toast from "react-native-toast-message";

export default function Login({ navigation }: any) {
    return (
        <ScrollView>
            <View className="min-h-screen justify-center items-center bg-white">
                <LoginForm navigation={navigation} />
            </View>

            <Toast />
        </ScrollView>
    );
}

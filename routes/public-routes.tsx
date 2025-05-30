// routes/PrivateRoutes.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/app/public/login';
import Register from '@/app/public/register';

const Stack = createNativeStackNavigator();

export default function PrivateRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
    );
}

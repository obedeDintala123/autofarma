import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';
import useLoadFonts from '@/hooks/useLoadFonts';

export default function RootLayout() {
    const { fontsLoaded } = useLoadFonts();

    if (!fontsLoaded) return null;
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Slot />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

// routes/PrivateRoutes.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '@/components/customDrawerContent'; // importe o drawer customizado

import Dashboard from '@/app/private/dashboard';
import Profile from '@/app/private/profile';
import Medicines from '@/app/private/medicines';
import Students from '@/app/private/students';
import Transactions from '@/app/private/transactions';

import { House, Student, UserCircle, Package, FileText } from 'phosphor-react-native';

import useScreenType from '@/hooks/useScreenType';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function PrivateRoutes() {
    const screenType = useScreenType();

    if (screenType === 'large') {
        return (
            <Drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}
                screenOptions={{
                    title: "",
                    headerTitleAlign: "center",
                    drawerStyle: {
                        backgroundColor: "#2C2C2C",
                        width: "20%",
                        borderRadius: 0,        // garantir que não tenha borda curva
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,       // remove qualquer borda
                        shadowColor: 'transparent', // remove sombra no iOS
                        elevation: 0,            // remove sombra no Android
                    },
                    drawerLabelStyle: { color: '#fff' },
                    drawerActiveBackgroundColor: '#429867', // "hover" / item ativo
                    drawerInactiveBackgroundColor: 'transparent',
                    drawerActiveTintColor: '#fff', // Texto e ícone ativos
                    drawerInactiveTintColor: '#429867', // Texto e ícone inativos
                    drawerItemStyle: {
                        borderRadius: "10px",
                        width: "90%",
                        padding: 0
                    }
                }}
            >
                <Drawer.Screen name="dashboard" component={Dashboard} options={{
                    drawerIcon: ({ size }) => <House color={"#fff"} size={size} />,
                    drawerLabel: "Dashboard",
                }} />
                <Drawer.Screen name="medicines" component={Medicines} options={{
                    drawerIcon: ({ size }) => <Package color={"#fff"} size={size} />,
                    drawerLabel: "Estoque"
                }} />
                <Drawer.Screen name="students" component={Students} options={{
                    drawerIcon: ({ size }) => <Student color={"#fff"} size={size} />,
                    drawerLabel: "Alunos"
                }} />
                <Drawer.Screen name="transactions" component={Transactions} options={{
                    drawerIcon: ({ size }) => <FileText color={"#fff"} size={size} />,
                    drawerLabel: "Transações"
                }} />
                {/* Remova o Drawer.Screen do perfil daqui */}
            </Drawer.Navigator>
        );
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    const iconsMap = {
                        dashboard: House,
                        medicines: Package,
                        students: Student,
                        transactions: FileText,
                        profile: UserCircle,
                    };

                    const IconComponent = iconsMap[route.name as keyof typeof iconsMap];

                    return IconComponent ? (
                        <IconComponent size={size} color={color} weight={focused ? 'fill' : 'regular'} />
                    ) : null;
                },
                tabBarActiveTintColor: '#00875F',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="dashboard" component={Dashboard} options={{ title: "Dashboard" }} />
            <Tab.Screen name="medicines" component={Medicines} options={{ title: "Estoque" }} />
            <Tab.Screen name="students" component={Students} options={{ title: "Alunos" }} />
            <Tab.Screen name="transactions" component={Transactions} options={{ title: "Transações" }} />
            <Tab.Screen name="profile" component={Profile} options={{ title: "Perfil" }} />
        </Tab.Navigator>
    );
}

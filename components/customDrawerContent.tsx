// components/CustomDrawerContent.tsx
import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { UserCircle } from 'phosphor-react-native';

export default function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }} >
            {/* Topo da Sidebar - Nome ou saudação */}
            <View className='py-6 '>
                <Text className='text-white font-montserratSemiBold text-center text-2xl'>
                    Auto Farma
                </Text>
            </View>

            {/* Menu principal */}
            <View style={{ flex: 1 }}>
                <DrawerItemList {...props} />
            </View>

            {/* Parte inferior - Perfil */}
            <View style={{ borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <DrawerItem

                    label="Perfil"
                    labelStyle={{ color: '#fff' }}
                    icon={({ size }) => <UserCircle color="#fff" size={size} />}
                    onPress={() => props.navigation.navigate('profile')}
                />
            </View>
        </DrawerContentScrollView>
    );
}

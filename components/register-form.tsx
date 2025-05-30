import { isAxiosError } from "axios";

import { View, Pressable, TouchableOpacity, Text, TextInput } from "react-native";

import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Toast from "react-native-toast-message"; // Importar diretamente o Toast
import Loader from "./ui/loader";

import { useAuth } from '@/context/auth-context';
import { Register } from "@/api/auth";

const registerSchema = z.object({
    name: z.string().nonempty("Preencha este campo"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
});

type RegisterData = z.infer<typeof registerSchema>;

export const RegisterForm = ({ navigation }: any) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            password: "",
        },
    });

    const { setUser } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: RegisterData) => {
        setIsLoading(true);

        try {
            const userData = await Register(data);
            console.log('Conta criada com sucesso:', userData.message);

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Sucesso!',
                text2: userData.message,
                visibilityTime: 2000,
                autoHide: true,
            });

            setTimeout(() => {
                setUser(userData);
            }, 2000);

        } catch (error) {
            if (isAxiosError(error)) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro ao criar a conta!',
                    text2: error.response?.data?.message || "Verifique a conexão com a internet",
                    visibilityTime: 3000,
                    autoHide: true,
                });
            } else {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro desconhecido!',
                    text2: 'Algo deu errado. Tente novamente.',
                    visibilityTime: 3000,
                    autoHide: true,
                });
            }


        } finally {
            setValue("name", "");
            setValue("password", "");
            setIsLoading(false);
        }
    };

    return (
        <View className="w-[90%] p-3 gap-10">
            <Text className="text-primary text-center font-montserratSemiBold text-3xl">Auto Farma</Text>

            <View className="gap-4">
                <Text className="text-secondary-app font-montserratMedium text-2xl">Cadastrar</Text>
                <Text className="text-secondary-app text-sm font-montserratLight">
                    Por favor, insira suas informações para criar a sua conta
                </Text>
            </View>

            <View className="gap-2">
                <Text nativeID="name" className="text-secondary-app font-montserratMedium text-xs">Escola</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            nativeID="password"
                            value={value}
                            onChangeText={onChange}
                            className="border border-gray-300 p-3 rounded-md"
                        />
                    )}
                />
                {errors.name && <Text className="text-red-400 text-[12px]">{errors.name.message}</Text>}
            </View>

            <View className="gap-2">
                <Text nativeID="password" className="text-secondary-app font-montserratMedium text-xs">Senha</Text>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            nativeID="password"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                            className="border border-gray-300 p-3 rounded-md"
                        />
                    )}
                />
                {errors.password && <Text className="text-red-400 text-[12px]">{errors.password.message}</Text>}
            </View>

            <TouchableOpacity className="bg-primary p-3 rounded-md" onPress={handleSubmit(onSubmit)} disabled={isLoading}>
                {isLoading ? (
                    <Loader color="#FFF" />
                ) : (
                    <Text className="text-white text-center font-montserratMedium">Criar conta</Text>
                )}
            </TouchableOpacity>

            <View className="flex flex-row items-center m-auto">
                <Text className="text-secondary font-montserratRegular text-sm">Já possue uma conta? </Text>
                <Pressable onPress={() => navigation.navigate("login")}>
                    <Text className="text-primary font-montserratSemiBold">Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

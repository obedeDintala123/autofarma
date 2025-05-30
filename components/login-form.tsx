import { isAxiosError } from "axios";
import { View, Pressable, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { Login } from "@/api/auth";
import { useAuth } from '@/context/auth-context';

import Loader from "@/components/ui/loader";

const loginSchema = z.object({
    name: z.string().nonempty("Preencha este campo"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
});

type LoginData = z.infer<typeof loginSchema>;

export const LoginForm = ({ navigation }: any) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: "",
            password: "",
        },
    });

    const { setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: LoginData) => {
        setIsLoading(true);

        try {
            const userData = await Login(data);
            console.log('Logado com sucesso:', userData);

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
                    text1: 'Erro ao fazer login',
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
            <Text className="text-primary text-center font-poppins text-3xl">Auto Farma</Text>

            <View className="gap-4">
                <Text className="text-secondary font-poppins text-2xl">Login</Text>
                <Text className="text-secondary-app text-sm font-poppins font-light">
                    Por favor, insira suas informações para acessar sua conta.
                </Text>
            </View>

            <View className="gap-2">
                <Text className="text-secondary-app font-poppins text-base">Escola</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            nativeID="name"
                            value={value}
                            onChangeText={onChange}
                            className="border border-gray-300 p-3 rounded-md"
                        />
                    )}
                />
                {errors.name && <Text className="text-red-400 font-poppins text-[12px]">{errors.name.message}</Text>}
            </View>

            <View className="gap-2">
                <Text className="text-secondary-app ffont-poppins text-base">Senha</Text>
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
                {errors.password && <Text className="text-red-400 font-poppins text-[12px]">{errors.password.message}</Text>}
            </View>

            <TouchableOpacity className="bg-primary p-3 rounded-md" onPress={handleSubmit(onSubmit)} disabled={isLoading}>
                {isLoading ? (
                    <Loader color="#FFF" />
                ) : (
                    <Text className="text-white text-center font-poppins font-semibold">Entrar</Text>
                )}
            </TouchableOpacity>


            <View className="flex flex-row items-center m-auto mt-4">
                <Text className="text-secondary font-poppins text-sm">Não possui uma conta? </Text>
                <Pressable onPress={() => navigation.navigate("register")}>
                    <Text className="text-primary font-poppins">Cadastrar</Text>
                </Pressable>
            </View>
        </View>
    );
};

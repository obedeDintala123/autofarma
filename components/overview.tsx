import React, { useState } from "react"
import { View, Pressable, Text } from "react-native"
import useScreenType from "@/hooks/useScreenType"
import { CardDashboard, CardNotification } from "./card-dashboard"
import { CustomSelect } from "./custom-select"

export const Overview = () => {

    const screenType = useScreenType();
    const [selected, setSelected] = useState('');

    return (
        <View className="w-full flex items-center">
            <View className="bg-white border-[#d9d9d9] border-[1px] w-[90%] mt-20 rounded-md">
                <View className="flex gap-10 flex-row justify-between items-center p-6 md:p-8">
                    <Text className="text-primary font-montserratSemiBold text-2xl md:text-3xl">Visão  Geral</Text>

                    {screenType === "small" ? (
                        <CustomSelect
                            options={["Hoje", "Ontem", "Esta semana"]}
                            selected={selected}
                            onSelect={setSelected}
                        />
                    ) : (
                        <View className="flex flex-row items-center gap-10">
                            <Pressable className="bg-primary rounded-md px-8 py-[10px]">
                                <Text className="text-white font-montserratSemiBold text-xs">Hoje</Text>
                            </Pressable>

                            <Pressable className="border border-primary px-8 py-[10px] rounded-md">
                                <Text className="text-primary font-montserratMedium text-xs">Ontem</Text>
                            </Pressable>

                            <Pressable className="border border-primary px-8 py-[10px] rounded-md">
                                <Text className="text-primary font-montserratMedium text-xs">Esta semana</Text>
                            </Pressable>
                        </View>
                    )
                    }
                </View >

                <View className="flex gap-4 md:gap-0 md:flex-row justify-between p-6 md:p-8 rounded-md">
                    <CardDashboard title="Total de remedios" number={0} type="info" />
                    <CardDashboard title="Total de alunos" number={0} type="info" />
                </View>
            </View >

            <View className="bg-white border-[#d9d9d9] border-[1px] w-[90%] mt-14 rounded-md">
                <View className="flex gap-4 md:gap-0 md:flex-row justify-between p-8 rounded-md">
                    <CardDashboard title="Transações realizadas" number={0} type="info" />
                    <CardDashboard title="Remédios vencidos" number={0} type="alert" />
                </View>
            </View>

            <View className="bg-white border-[#d9d9d9] border-[1px] w-[90%] mt-14 rounded-md">
                <View className="flex gap-4 md:gap-0 md:flex-row justify-between p-8 rounded-md">
                    <CardDashboard title="Remédios em baixo estoque" number={0} type="alert" />
                    <CardNotification title="Alerta" description="Remédio Paracetamol está vencido!" type="alert" />
                </View>
            </View>

        </View >
    )
}

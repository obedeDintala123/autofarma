import { Text, View } from "react-native";

type CardType = "info" | "alert";

interface CardDashboardProps {
    title: string;
    number?: number;
    description?: string;
    type: CardType;
}

export const CardDashboard = ({ title, number, type }: CardDashboardProps) => {
    return (
        <View className="gap-2 p-6 md:p-8 bg-[#f2f2f2] md:w-[40%] rounded-md">
            <Text className={`font-poppins text-xl ${type === "info" ? "text-primary" : "text-red-400"}`}>{title}</Text>
            <Text className="text-secondary font-poppins text-lg md:text-2xl">{number}</Text>
        </View>
    );
};

export const CardNotification = ({ title, description, type }: CardDashboardProps) => {
    return (
        <View className="gap-2 p-6 md:p-8 bg-[#f2f2f2] md:w-[40%] rounded-md">
            <Text className={`font-poppins text-xl ${type === "info" ? "text-primary" : "text-red-400"}`}>{title}</Text>
            <Text className="text-secondary font-poppins  text-xs md:text-2xl">{description}</Text>
        </View>
    )
}
import React, { useCallback } from 'react';
import Toast from 'react-native-toast-message';

interface ToasterProps {
    text1: string; // Texto principal do toast
    description?: string; // Descrição adicional
    type?: 'success' | 'error' | 'info'; // Tipo de toast
    duration?: number; // Duração do toast
    visibilityTime?: number; // Duração da visibilidade
}

const Toaster: React.FC<ToasterProps> = ({
    text1,
    description = '',
    type = 'info',
    duration = 3000,
    visibilityTime = 3000,
}) => {

    const showToast = useCallback(() => {
        Toast.show({
            type, // Tipo do toast (success, error, info)
            position: 'bottom', // Onde o toast aparecerá (bottom, top, center)
            text1, // Texto principal
            text2: description, // Texto da descrição
            visibilityTime, // Quanto tempo o toast ficará visível
            autoHide: true, // O toast desaparece automaticamente após a duração
        });
    }, [description, text1, type, visibilityTime]);

    React.useEffect(() => {
        showToast(); // Dispara o toast assim que o componente é renderizado
    }, [showToast]);

    return null; // Não renderiza nada visualmente aqui
};

export default Toaster;

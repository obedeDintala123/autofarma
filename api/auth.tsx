import axios, { isAxiosError } from "axios";
import { API_URL } from "@env";

interface authProps {
    name: string;
    password: string;
}

const Login = async (data: authProps) => {

    try {
        const response = await axios.post(`${API_URL}/login`, {
            nome: data.name,
            senha: data.password,
        });

        console.log('Resposta do servidor:', response.data);
        return response.data;

    } catch (error) {
        if (isAxiosError(error)) {
            console.error('Erro da API:', error.response?.data);
            throw error;
        } else {
            console.error('Erro inesperado:', error);
            throw error;
        }
    }
}


const Register = async (data: authProps) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            nome: data.name,
            senha: data.password,
        });

        console.log('Resposta do servidor:', response.data);
        return response.data;

    } catch (error) {
        if (isAxiosError(error)) {
            console.error('Erro da API:', error.response?.data);
            throw error;
        } else {
            console.error('Erro inesperado:', error);
            throw error;
        }
    }
}


export { Login, Register }
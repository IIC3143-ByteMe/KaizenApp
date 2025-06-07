import api from "../api";
import { setSessionToken } from "@hooks/useSessionToken";

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const register = async (data: RegisterData): Promise<void> => {
  try {
    await api.post("/auth/register", data);
    console.log("Registro exitoso");
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};

export const login = async (data: LoginData): Promise<string> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", data);
    const access_token = response.data.access_token;
    await setSessionToken(access_token);
    console.log("Inicio de sesión exitoso");
    return access_token;
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    throw error;
  }
};

export const registerAndLogin = async (data: RegisterData): Promise<string> => {
  try {
    await register(data);
    
    const token = await login({
      email: data.email,
      password: data.password
    });
    
    return token;
  } catch (error) {
    console.error("Error en registro e inicio de sesión:", error);
    throw error;
  }
};
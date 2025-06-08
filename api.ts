import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./apiConfig";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async config => {
    try {
        const token = await SecureStore.getItemAsync("sessionToken");
        
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
            
        return config;
    } catch (error) {
        console.error('❌ Error en interceptor de solicitud:', error);
        return Promise.reject(error);
    }
});

api.interceptors.response.use(
    response => {
        
        if (response.data) {
            console.log('📦 Respuesta Backend OK:');
        }
        
        return response;
    },
    error => {
        console.log('🔽🔽🔽 INICIO ERROR HTTP 🔽🔽🔽');
        
        if (error.response) {
            console.error(`❌ Error ${error.response.status} ${error.response.statusText}`);
            console.error(`📍 De: ${error.config.method?.toUpperCase()} ${error.config.url}`);
            console.error('📋 HEADERS DE RESPUESTA:');
            console.error(JSON.stringify(error.response.headers, null, 2));
            
            if (error.response.data) {
                console.error('📦 BODY DE ERROR:');
                try {
                    console.error(JSON.stringify(error.response.data, null, 2));
                } catch (e) {
                    console.error('(Datos no serializables a JSON)');
                }
            }
            
        } else if (error.request) {
            console.error('❌ Error de solicitud sin respuesta');
            console.error('📍 URL:', error.config?.url || 'No disponible');
            console.error('⏱️ Posible timeout o problema de red');
        } else {
            console.error('❌ Error general:', error.message);
        }
        
        console.log('🔼🔼🔼 FIN ERROR HTTP 🔼🔼🔼');
        return Promise.reject(error);
    }
);

export default api;

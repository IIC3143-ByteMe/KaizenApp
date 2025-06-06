import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'sessionToken';

export async function setSessionToken(token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getSessionToken() {
    return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeSessionToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
}
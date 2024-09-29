// services/auth.ts
import {type ApiResponse, handleRequest} from "~/services/request";

// services/auth.ts
export interface UserProfile {
    id: string;
    firstname: string;
    lastname: string;
    mail: string;
    locale: string;
}

interface UserProfileResponse {
    isAuthenticated: boolean;
    profile: UserProfile | null;
}

export interface UserProfile {
    id: string;
    firstname: string;
    lastname: string;
    mail: string;
    locale: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    statusCode?: number;
}

// Fonction pour enregistrer un utilisateur
interface RegisterData {
    email: string;
    password: string;
    locale: string;
}

export const registerUser = async (data: RegisterData) => {
    return await handleRequest(async () => {
        return await $fetch('/api/sign-up', {
            method: 'POST',
            body: data,
        });
    });
};

// Fonction pour la connexion utilisateur
export const loginUser = async (data: { email: string; password: string }): Promise<ApiResponse<LoginResponse>> => {
    return await handleRequest(async () => {
        return await $fetch('/api/login', {
            method: 'POST',
            body: data,
        });
    });
};

// Fonction pour se déconnecter
export const logOut = async () => {
    return await handleRequest(async () => {
        return await $fetch('/api/accounts/me/logout', {
            method: 'POST',
        });
    });
};

// Fonction pour mettre à jour le mot de passe
export const updatePassword = async (mail: string, newPassword: string) => {
    return await handleRequest(async () => {
        return await $fetch('/api/accounts/me/password', {
            method: 'PUT',
            body: {
                email: mail,
                password: newPassword,
            },
        });
    });
};


export const fetchUserProfile = async (): Promise<ApiResponse<UserProfileResponse>> => {
    return await handleRequest(async () => {
        return await $fetch('/api/accounts/me', {
            method: 'GET',
            credentials: 'include',
        });
    });
};

export const verifyEmailToken = async (token: string) => {
    return await handleRequest(async () => {
        return await $fetch('/api/account-requests', {
            method: 'POST',
            body: {token},
        });
    });
};
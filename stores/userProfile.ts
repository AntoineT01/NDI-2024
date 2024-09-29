import { defineStore } from 'pinia';
import {fetchUserProfile} from "~/services/auth";

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        locale: '',
        isUserLoggedIn: false, // Pour suivre l'état de connexion
    }),
    actions: {
        async checkConnected() {
            const response = await fetchUserProfile();

            // Vérifie si la requête est un succès et si les données existent
            if (response.success && response.data) {
                const {isAuthenticated, profile} = response.data;

                if (isAuthenticated && profile) {
                    console.log("Authenticated");
                    this.isUserLoggedIn = true;
                    this.id = profile.id || '';
                    this.firstname = profile.firstname || '';
                    this.lastname = profile.lastname || '';
                    this.email = profile.mail || '';
                    this.locale = profile.locale || 'en';
                    console.log("Profile : ", this.email);
                } else {
                    this.resetProfile();
                }
            } else {
                this.resetProfile();
            }
        },
        async updateProfile(data: { id: string; firstname: string; lastname: string; email: string; locale: string }) {
            try {
                await $fetch('/api/accounts/me', {
                    method: 'PUT',
                    body: data,
                });
                this.id = data.id;
                this.firstname = data.firstname;
                this.lastname = data.lastname;
                this.email = data.email;
                this.locale = data.locale;
            } catch (error) {
                console.error('Failed to update profile:', error);
            }
        },
        resetProfile() {
            this.firstname = '';
            this.lastname = '';
            this.email = '';
            this.locale = '';
            this.id = '';
            this.isUserLoggedIn = false;
        }
    }
});

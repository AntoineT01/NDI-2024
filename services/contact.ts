import {handleRequest} from "~/services/request";

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export const sendContactForm = async (data: ContactFormData) => {
    return await handleRequest(async () => {
        return await $fetch('/api/contact', {
            method: 'POST',
            body: data,
        });
    });
};

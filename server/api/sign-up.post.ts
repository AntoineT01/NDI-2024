import { defineEventHandler, readBody, createError } from 'h3';
import Account from '~/server/models/Account';
import AccountRequest from '~/server/models/AccountRequest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { useEnvironment } from '~/composables/useEnvironment';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import mongoose from 'mongoose';
import * as fs from 'fs';
import path from 'path';
import nodemailer from "nodemailer";

// Fonction pour envoyer l'email de vérification
async function sendVerificationEmail(email: string, token: string, isProd: boolean) {
    const verificationUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/email-verification/${token}`;
    const app_name = process.env.APP_NAME || 'My App';
    const footer = `© ${new Date().getFullYear()} ${app_name}. All rights reserved.`;

    // Environnement de production : utilisation de Mailgun
    if (isProd) {
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
            url: process.env.MAILGUN_API_URL || 'https://api.eu.mailgun.net',
        });

        if (!process.env.MAILGUN_DOMAIN) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Mailgun domain is required to be set in .env',
            });
        }

        // Options d'envoi avec Mailgun (template Mailgun)
        const mailOptions = {
            from: process.env.EMAIL_USER || 'no-reply@tanguylegoff.com',
            to: email,
            subject: 'Email Verification',
            template: 'verify-mail-en', // Nom du template sur Mailgun
            'h:X-Mailgun-Variables': JSON.stringify({
                action_url: verificationUrl,
                app_name: app_name,
                footer: footer,
            }),
        };

        // Envoi de l'e-mail via Mailgun
        try {
            await mg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions);
        } catch (error) {
            console.error('Error sending email via Mailgun:', error);
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to send verification email',
                data: (error as Error).message,
            });
        }
    } else {
        // Méthode de développement : Lecture locale du template HTML
        const emailTemplatePath = path.join(process.cwd(), 'public/templates/verify-mail.html');

        let emailTemplate = '';
        try {
            emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
        } catch (err) {
            console.error('Error reading email template:', err);
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to load email template',
            });
        }

        // Remplacement des variables dans le template
        emailTemplate = emailTemplate.replace(/{{action_url}}/g, verificationUrl);
        emailTemplate = emailTemplate.replace(/{{app_name}}/g, app_name);
        emailTemplate = emailTemplate.replace(/{{footer}}/g, footer);

        // Définir les options de l'e-mail avec le contenu du template HTML
        const mailOptions = {
            from: process.env.EMAIL_USER || 'no-reply@tanguylegoff.com',
            to: email,
            subject: 'Email Verification',
            html: emailTemplate,
        };

        // Simulez ou envoyez l'e-mail en local avec nodemailer
        const transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 8125,
            secure: false,
            tls: {
                rejectUnauthorized: false,
            },
            debug: true,
            logger: true,
        });

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email via Nodemailer:', error);
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to send verification email in development',
                data: (error as Error).message,
            });
        }
    }
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, firstname = null, lastname = null, password } = body;

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required',
        });
    }

    const { isProd } = useEnvironment();

    // Vérifiez si le compte existe déjà
    const existingAccount = await Account.findOne({ mail: email });
    if (existingAccount) {
        const existingRequest = await AccountRequest.findOne({
            account_id: existingAccount._id,
            request_type: 'SIGNUP',
            expiration_date: { $gt: new Date() },
        });

        if (existingRequest) {
            throw createError({
                statusCode: 400,
                statusMessage: 'register.error.already_requested',
            });
        }

        if (existingAccount.active) {
            throw createError({
                statusCode: 400,
                statusMessage: 'register.error.already_exists',
            });
        }

        // Si le compte est inactif, renvoyer l'email de vérification
        const newToken = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '15min' });
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 15);

        const newAccountRequest = new AccountRequest({
            token: newToken,
            account_id: existingAccount._id,
            expiration_date: expirationDate,
            request_type: 'SIGNUP',
        });

        await newAccountRequest.save();
        await sendVerificationEmail(email, newToken, isProd);

        return { success: true, message: 'Account exists but inactive. Verification email resent.' };
    }

    // Création d'un nouveau compte si le compte n'existe pas
    let newAccount;
    let accountRequest;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        newAccount = new Account({
            profile_id: new mongoose.Types.ObjectId(),
            firstname,
            lastname,
            mail: email,
            password: hashedPassword,
            active: false,
        });

        await newAccount.save();

        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '15min' });
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 15);

        accountRequest = new AccountRequest({
            token,
            account_id: newAccount._id,
            expiration_date: expirationDate,
            request_type: 'SIGNUP',
        });

        await accountRequest.save();

        await sendVerificationEmail(email, token, isProd);

        return { success: true, message: 'Verification email sent' };
    } catch (error) {
        if (newAccount) {
            await Account.findByIdAndDelete(newAccount._id);
        }

        if (accountRequest) {
            await AccountRequest.findByIdAndDelete(accountRequest._id);
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'An error occurred. Account creation rolled back.',
            data: (error as Error).message,
        });
    }
});

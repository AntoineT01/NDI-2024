import { defineEventHandler, readBody, createError } from 'h3';
import nodemailer from 'nodemailer';

const emailSendCounts: Record<string, { count: number, lastSent: Date }> = {};
const ipSendCounts: Record<string, { count: number, lastSent: Date }> = {};

// Limites des envois
const MAX_EMAILS_PER_DAY = 3;
const TIME_WINDOW = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, email, message } = body;

    if (!name || !email || !message) {
        throw createError({
            statusCode: 400,
            statusMessage: 'contact.post.error.fields_required',
        });
    }

    const ipHeader = event.node.req.headers['x-forwarded-for'];
    const ip = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader || event.node.req.socket.remoteAddress || '';

    const currentIpCount = ipSendCounts[ip] || { count: 0, lastSent: new Date(0) };
    const now = new Date();
    const timeSinceLastIpSent = now.getTime() - currentIpCount.lastSent.getTime();

    if (currentIpCount.count >= MAX_EMAILS_PER_DAY && timeSinceLastIpSent < TIME_WINDOW) {
        throw createError({
            statusCode: 429,
            statusMessage: 'contact.post.error.too_many_messages_ip',
        });
    }

    const currentEmailCount = emailSendCounts[email] || { count: 0, lastSent: new Date(0) };
    const timeSinceLastEmailSent = now.getTime() - currentEmailCount.lastSent.getTime();

    if (currentEmailCount.count >= MAX_EMAILS_PER_DAY && timeSinceLastEmailSent < TIME_WINDOW) {
        throw createError({
            statusCode: 429,
            statusMessage: 'contact.post.error.too_many_messages_email',
        });
    }

    const emailUser = process.env.CONTACT_MAIL_USER;
    const emailPass = process.env.CONTACT_MAIL_PASS;
    const emailTo = process.env.CONTACT_MAIL_TO || '';

    if (!emailUser || !emailPass) {
        throw createError({
            statusCode: 500,
            statusMessage: 'contact.post.error.missing_email_config',
        });
    }

    if (!emailTo) {
        throw createError({
            statusCode: 500,
            statusMessage: 'contact.post.error.missing_recipient_email',
        });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: emailTo,
        subject: `New message from ${name} via Contact Form`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);

        ipSendCounts[ip] = {
            count: currentIpCount.count + 1,
            lastSent: now,
        };

        emailSendCounts[email] = {
            count: currentEmailCount.count + 1,
            lastSent: now,
        };

        return { statusCode: 200, message: 'contact.post.success.message_sent' };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'contact.post.error.send_failure',
            });
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: 'contact.post.error.send_failure_generic',
            });
        }
    }
});

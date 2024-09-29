import bcrypt from 'bcrypt';
import {createError, defineEventHandler, readBody} from 'h3';
import Account from "~/server/models/Account";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password is required',
        });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const updatedAccount = await Account.findOneAndUpdate(
        { mail: email }, // On suppose que l'email est dans le payload du JWT
        {password: encryptedPassword},
        { new: true } // Retourner le document mis à jour
    );

    if (!updatedAccount) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Account not found'
        });
    }
});

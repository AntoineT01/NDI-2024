import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

// Account Request Schema
const AccountRequestSchema = new Schema({
    token: {
        type: String,
        required: true,
        maxlength: 1024,
        comment: 'An account request token, used to find the account again. Must be set.',
    },
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        comment: 'The account to handle. Must be set',
    },
    expiration_date: {
        type: Date,
        required: true,
        comment: 'Expiration date for the request (lasts up to 5-10 minutes). Must be set',
    },
    request_type: {
        type: String,
        required: true,
        enum: ['SIGNUP', 'CHANGE', 'RESET', 'VERIFYMAIL'],
        comment: 'The type of request (reset password, etc). Must be set',
    },
}, {
    timestamps: true,
    collection: 'account_requests',
    comment: 'Representation of an account request in the database',
});

const AccountRequest = mongoose.models.AccountRequest || model('AccountRequest', AccountRequestSchema);

export default AccountRequest;
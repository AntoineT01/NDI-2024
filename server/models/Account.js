import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

// Account Schema
const AccountSchema = new Schema({
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
        comment: 'The profile account, must be set',
    },
    firstname: {
        type: String,
        maxlength: 50,
        default: null,
        comment: 'The account\'s firstname. Nullable in case we "delete" the account.',
    },
    lastname: {
        type: String,
        maxlength: 50,
        default: null,
        comment: 'The account\'s lastname. Nullable in case we "delete" the account.',
    },
    password: {
        type: String,
        maxlength: 255,
        default: null,
        comment: 'The account\'s password. Nullable in case we "delete" the account.',
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        comment: 'The account\'s mail. Unique identifier for login.',
    },
    oauth_provider: {
        type: String,
        maxlength: 50,
        default: null,
        comment: 'The provider of the OAuth service (e.g., Google, Microsoft, Facebook)',
    },
    oauth_id: {
        type: String,
        maxlength: 255,
        default: null,
        comment: 'The unique identifier for the account from the OAuth provider.',
    },
    locale: {
        type: String,
        maxlength: 10,
        default: null,
        comment: 'IETF Tag of the selected locale for mails (fr, en)',
    },
    active: {
        type: Boolean,
        default: false,
        required: true,
        comment: 'Active status for this account. Should be false if mail has not been checked or if account was deleted',
    },
    created_at: {
        type: Date,
        default: Date.now,
        comment: 'Date and time when the account was created.',
    },
    updated_at: {
        type: Date,
        default: Date.now,
        comment: 'Date and time when the account was last updated.',
    },
    last_login_at: {
        type: Date,
        default: null,
        comment: 'Date and time when the account was last used.',
    },
    deleted_at: {
        type: Date,
        default: null,
        comment: 'Date and time when the account was logically deleted.',
    },
}, {
    timestamps: true,
    collection: 'accounts',
    comment: 'Representation of an account in the database',
});

const Account = mongoose.models.Account || model('Account', AccountSchema);

export default Account;

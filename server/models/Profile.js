import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// Profile Schema
const ProfileSchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
    },
}, {
    timestamps: true,
    collection: 'profiles',
    comment: 'Representation of a profile in the database',
});

// Création du modèle à partir du schéma
const Profile = mongoose.models.Profile || model('Profile', ProfileSchema);

// Exportation du modèle pour utilisation ailleurs dans l'application
export default Profile;

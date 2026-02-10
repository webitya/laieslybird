import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    bio: string;
    avatar: string;
}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        bio: { type: String },
        avatar: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Author || mongoose.model<IAuthor>('Author', AuthorSchema);

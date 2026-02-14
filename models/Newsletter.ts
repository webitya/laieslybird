import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
    email: string;
    isVerified: boolean;
    subscribedAt: Date;
}

const NewsletterSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        isVerified: { type: Boolean, default: false },
        subscribedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Newsletter ||
    mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

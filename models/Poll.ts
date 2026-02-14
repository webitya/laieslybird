import mongoose, { Schema, Document } from 'mongoose';

export interface IPoll extends Document {
    question: string;
    options: {
        text: string;
        votes: number;
    }[];
    isActive: boolean;
    expiresAt?: Date;
    totalVotes: number;
}

const PollSchema = new Schema(
    {
        question: { type: String, required: true },
        options: [
            {
                text: { type: String, required: true },
                votes: { type: Number, default: 0 },
            },
        ],
        isActive: { type: Boolean, default: true },
        expiresAt: { type: Date },
        totalVotes: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Poll ||
    mongoose.model<IPoll>('Poll', PollSchema);

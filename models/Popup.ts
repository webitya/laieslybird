import mongoose, { Schema, Document } from 'mongoose';

export interface IPopup extends Document {
    title: string;
    image: string;
    link?: string;
    isActive: boolean;
    displayFrequency: 'once' | 'daily' | 'always';
    startDate?: Date;
    endDate?: Date;
}

const PopupSchema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        link: { type: String },
        isActive: { type: Boolean, default: true },
        displayFrequency: {
            type: String,
            enum: ['once', 'daily', 'always'],
            default: 'once',
        },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Popup ||
    mongoose.model<IPopup>('Popup', PopupSchema);

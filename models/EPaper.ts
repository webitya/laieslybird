import mongoose, { Schema, Document } from 'mongoose';

export interface IEPaper extends Document {
    title: string;
    date: Date;
    pdfUrl: string;
    thumbnail?: string;
    pages: number;
    isActive: boolean;
}

const EPaperSchema = new Schema(
    {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        pdfUrl: { type: String, required: true },
        thumbnail: { type: String },
        pages: { type: Number, default: 1 },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

// Index for faster date queries
EPaperSchema.index({ date: -1 });

export default mongoose.models.EPaper ||
    mongoose.model<IEPaper>('EPaper', EPaperSchema);

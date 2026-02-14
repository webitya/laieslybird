import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitorStats extends Document {
    date: Date;
    totalVisitors: number;
    currentOnline: number;
    pageViews: number;
}

const VisitorStatsSchema = new Schema(
    {
        date: { type: Date, required: true, unique: true },
        totalVisitors: { type: Number, default: 0 },
        currentOnline: { type: Number, default: 0 },
        pageViews: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.VisitorStats ||
    mongoose.model<IVisitorStats>('VisitorStats', VisitorStatsSchema);

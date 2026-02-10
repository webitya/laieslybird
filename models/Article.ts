import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    slug: string;
    content: string;
    images: string[];
    category: mongoose.Types.ObjectId;
    tags: mongoose.Types.ObjectId[];
    author: mongoose.Types.ObjectId;
    status: 'draft' | 'published';
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        images: [{ type: String }],
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
        author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        status: { type: String, enum: ['draft', 'published'], default: 'draft' },
        featuredImage: { type: String },
        publishedAt: { type: Date },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Add index for search
ArticleSchema.index({ title: 'text', content: 'text' });

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

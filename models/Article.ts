import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    slug: string;
    content: string;
    images: string[];
    category: mongoose.Types.ObjectId;
    tags: mongoose.Types.ObjectId[];
    author: mongoose.Types.ObjectId;
    status: 'draft' | 'published' | 'archived';
    isBreaking?: boolean;
    isLive?: boolean;
    viewCount?: number;
    shareCount?: number;
    publishedAt?: Date;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        excerpt: { type: String },
        featuredImage: { type: String },
        images: [{ type: String }],
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
        author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        isBreaking: { type: Boolean, default: false },
        isLive: { type: Boolean, default: false },
        viewCount: { type: Number, default: 0 },
        shareCount: { type: Number, default: 0 },
        publishedAt: { type: Date },
        seo: {
            metaTitle: String,
            metaDescription: String,
            keywords: [String],
        },
    },
    {
        timestamps: true,
    }
);

// Add index for search
ArticleSchema.index({ title: 'text', content: 'text' });

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

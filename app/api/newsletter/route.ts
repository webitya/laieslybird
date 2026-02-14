import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Newsletter from '@/models/Newsletter';

export const dynamic = 'force-dynamic';

// POST subscribe to newsletter
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
        }

        // Check if already subscribed
        const existing = await Newsletter.findOne({ email: email.toLowerCase() });

        if (existing) {
            return NextResponse.json(
                { error: 'This email is already subscribed' },
                { status: 400 }
            );
        }

        const subscription = await Newsletter.create({
            email: email.toLowerCase(),
            isVerified: false,
        });

        // TODO: Send verification email here
        // await sendVerificationEmail(email);

        return NextResponse.json(
            { message: 'Successfully subscribed!', id: subscription._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe' },
            { status: 500 }
        );
    }
}

// GET all subscribers (admin only)
export async function GET() {
    try {
        await dbConnect();

        const subscribers = await Newsletter.find({}).sort({ subscribedAt: -1 });

        return NextResponse.json(subscribers);
    } catch (error) {
        console.error('Newsletter fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subscribers' },
            { status: 500 }
        );
    }
}

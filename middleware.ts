import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

        // Protect admin routes from non-admin/editor users
        if (isAdminRoute && !token && req.nextUrl.pathname !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        // Further role-based checks can be added here
        if (isAdminRoute && token?.role !== 'admin' && token?.role !== 'editor') {
            if (req.nextUrl.pathname !== '/admin/login') {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/admin/login',
        }
    }
);

export const config = {
    matcher: ['/admin/:path*'],
};

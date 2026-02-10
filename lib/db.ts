import mongoose from 'mongoose';
import '@/models/Article';
import '@/models/Category';
import '@/models/Author';
import '@/models/Tag';
import '@/models/User';

const MONGODB_URI = process.env.MONGODB_URI;


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('MONGODB_URI is missing. Skipping connection (likely build time).');
      return null;
    }
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  if (!cached.promise) {

    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

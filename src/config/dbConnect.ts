import _mongoose, { connect } from 'mongoose';

declare global {
   var mongoose: {
      promise: ReturnType<typeof connect> | null;
      conn: typeof _mongoose | null;
   };
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
   cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(dbURI: string) {
   if (cached.conn) {
      return cached.conn;
   }

   if (!cached.promise) {
      const opts = {
         bufferCommands: false,
      };

      cached.promise = connect(dbURI!, opts).then((mongoose) => {
         return mongoose;
      });
   }

   try {
      cached.conn = await cached.promise;
   } catch (e) {
      cached.promise = null;
      throw e;
   }

   return cached.conn;
}

export default dbConnect;

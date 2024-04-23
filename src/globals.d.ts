import _mongoose, { connect } from 'mongoose';

declare global {
   namespace NodeJS {
      interface Global {
         mongoose: {
            promise: ReturnType<typeof connect> | null;
            conn: typeof _mongoose | null;
         };
      }
   }
}
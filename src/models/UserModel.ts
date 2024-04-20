import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   id: { type: String, required: true, unique: true },
   username: { type: String, unique: true },
   email: { type: String, unique: true },
   status: { type: String, default: 'offline' }
});

const User = mongoose.model('User', userSchema);
export default User;

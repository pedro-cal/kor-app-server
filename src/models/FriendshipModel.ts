import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   id: { type: String, required: true, unique: true },
   solicitor: { type: String, required: true },
   solicited: { type: String, required: true },
   status: { type: String, default: 'pending' }
});

const Friendship = mongoose.model('Friendship', userSchema);
export default Friendship;

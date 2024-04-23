import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  inviterId: { type: String, required: true },
  inviteeId: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

const Friendship = mongoose.model('Friendship', userSchema);
export default Friendship;

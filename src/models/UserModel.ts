import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  imgUrl: { type: String },
  status: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;

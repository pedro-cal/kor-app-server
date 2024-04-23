import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Assuming userSchema is already imported and you have the User model
// You can directly use the User model to reference in your new schema

const postSchema = new Schema({
   createdAt: { type: Date, required: true, default: Date.now },
   statusText: { type: String, required: true },
   user: { type: String, required: true },
});

const Post = model('Post', postSchema);

export default Post;
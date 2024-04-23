import Friendship from '../models/FriendshipModel';
import Post from '../models/PostModel';
import User from '../models/UserModel'; // If you need to validate user existence
import { v4 as uuidv4 } from 'uuid';

interface IPostData {
   userId: string;
   statusText: string;
}

export const createPost = async ({ userId, statusText }: IPostData) => {
   try {
      const userExists = await User.exists({ id: userId });
      if (!userExists) {
         throw new Error('User does not exist');
      }

      const postData = {
         id: uuidv4(),
         userId,
         statusText,
         createdAt: new Date(),
      };
      const newPost = new Post(postData);
      await newPost.save();
      return newPost;
   } catch (error) {
      const errorMessage = error as Error;
      throw new Error('Failed to create post: ' + errorMessage.message);
   }
};

export const fetchPostsByUserId = async (userId: string) => {
   try {
      const friends = await Friendship.find({
         $or: [{ inviterId: userId }, { inviteeId: userId }],
         status: 'accepted'
      });
      const friendIds = friends.map(f => f.inviterId === userId ? f.inviteeId : f.inviterId);
      const posts = await Post.find({
         'user.id': { $in: friendIds }
      }).populate('user');
      if (!posts.length) {
         throw new Error('No posts found for this user or their friends');
      }
      return posts.map(post => ({
         id: post.id,
         createdAt: post.createdAt,
         statusText: post.statusText,
         user: post.user
      }));
   } catch (error) {
      const errorMessage = error as Error;
      throw new Error('Failed to fetch posts: ' + errorMessage.message);
   }
};

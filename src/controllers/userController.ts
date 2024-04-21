import { Request, Response } from 'express';
import User from '../models/UserModel';
import { v4 as uuidv4 } from 'uuid';

interface IUserData {
   username?: string;
   email?: string;
   imgUrl?: string;
}

export const createUser = async ({ username, email, imgUrl }: IUserData) => {
   try {
      if (!username && !email) throw new Error('At least username or email must be informed')
      const userData = {
         id: uuidv4(),
         username,
         email,
         imgUrl,
         status: 'Edit your first status',
      }
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
   } catch (error) {
      const errorMessage = (error as Error);
      throw new Error('Failed to create user: ' + errorMessage);
   }
};

export const batchCreateUsers = async (users: IUserData[]) => {
   try {
      if (!users || !Array.isArray(users) || !users?.length) {
         throw new Error('No users found to create');
      }
      const createdUserPromises = users.map((user) => {
         const { username, email, imgUrl } = user;
         if (!username && !email) throw new Error('At least username or email must be informed')
         const userData = {
            id: uuidv4(),
            username,
            email,
            imgUrl,
            status: 'Edit your first status',
         }
         const newUser = new User(userData);
         return newUser.save();
      });
      const createdUsers = await Promise.all(createdUserPromises);
      return createdUsers;
   } catch (error) {
      const errorMessage = (error as Error);
      throw new Error('Failed to batch create users: ' + errorMessage);
   }
};

export const fetchAllUsers = async () => {
   try {
      const users = await User.find({});
      return users;
   } catch (error) {
      const errorMessage = (error as Error);
      throw new Error('Failed to fetch all users: ' + errorMessage);
   }
};

export const updateUserStatus = async (id: string, status: string) => {
   try {
      const user = await User.findByIdAndUpdate(id, { status }, { new: true });
      if (!user) throw new Error('No such user found.');
      return user;
   } catch (error) {
      const errorMessage = (error as Error);
      throw new Error('Failed to update user status: ' + errorMessage);
   }
};

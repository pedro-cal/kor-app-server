import Friendship from '../models/FriendshipModel';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/UserModel';

interface IFriendRequest {
   inviterName?: string;
   inviteeName?: string;
}

type TFriendshipStatus = 'pending' | 'accepted' | 'blocked';
function isValidFriendshipStatus(status: any): status is TFriendshipStatus {
   return ['pending', 'accepted', 'blocked'].includes(status);
}

export const createFriendRequest = async ({ inviterName, inviteeName }: IFriendRequest) => {
   try {
      if (!inviterName && !inviteeName) throw new Error('Missing request data.');
      const inviterData = await User.findOne({ username: inviterName });
      const inviteeData = await User.findOne({ username: inviteeName });

      if (!inviterData || !inviteeData) throw new Error('Could not find one or both users.');

      // avoid duplicate requests
      const currUserRequests = await Friendship.find({ inviterId: inviterData?.id });
      console.log("🚀 ~ createFriendRequest ~ currUserRequests:", currUserRequests)
      const isDuplicateRequest = currUserRequests.some((r) => {
         return r.inviteeId === inviteeData.id;
      });
      console.log("🚀 ~ isDuplicateRequest ~ isDuplicateRequest:", isDuplicateRequest)
      if (isDuplicateRequest) throw new Error('Request already exists.');

      const requestData = {
         id: uuidv4(),
         inviterId: inviterData?.id,
         inviteeId: inviteeData?.id,
         status: 'pending',
      }
      const newRequest = new Friendship(requestData);
      await newRequest.save();
      return newRequest;
   } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error('Failed to create friendship request: ' + errorMessage);
   }
};

export const updateFriendRequest = async (id: string, status: TFriendshipStatus) => {
   try {
      if (!id && !status) throw new Error('Missing request update data.');
      if (!isValidFriendshipStatus(status)) throw new Error('Invalid status.');

      const updatedRequest = await Friendship.findOneAndUpdate({ id }, { status }, { new: true });
      return updatedRequest;
   } catch (error) {
      const errorMessage = (error as Error).message;
      console.log("🚀 ~ updateFriendRequest ~ errorMessage:", errorMessage)
      throw new Error('There was a problem updating request: ' + errorMessage);
   }
};

// export const batchCreateUsers = async (users: IUserData[]) => {
//    try {
//       if (!users || !Array.isArray(users) || !users?.length) {
//          throw new Error('No users found to create');
//       }
//       const createdUserPromises = users.map((user) => {
//          const { username, email, imgUrl } = user;
//          if (!username && !email) throw new Error('At least username or email must be informed')
//          const userData = {
//             id: uuidv4(),
//             username,
//             email,
//             imgUrl,
//             status: 'Edit your first status',
//          }
//          const newUser = new User(userData);
//          return newUser.save();
//       });
//       const createdUsers = await Promise.all(createdUserPromises);
//       return createdUsers;
//    } catch (error) {
//       const errorMessage = (error as Error);
//       throw new Error('Failed to batch create users: ' + errorMessage);
//    }
// };

// export const fetchAllUsers = async () => {
//    try {
//       const users = await User.find({});
//       return users;
//    } catch (error) {
//       const errorMessage = (error as Error);
//       throw new Error('Failed to fetch all users: ' + errorMessage);
//    }
// };

// export const updateUserStatus = async (id: string, status: string) => {
//    try {
//       const user = await User.findByIdAndUpdate(id, { status }, { new: true });
//       if (!user) throw new Error('No such user found.');
//       return user;
//    } catch (error) {
//       const errorMessage = (error as Error);
//       throw new Error('Failed to update user status: ' + errorMessage);
//    }
// };

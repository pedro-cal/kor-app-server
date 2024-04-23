import Friendship from '../models/FriendshipModel';
import { v4 as uuidv4 } from 'uuid';

interface IFriendRequest {
   inviterId?: string;
   inviteeId?: string;
}

type TFriendshipStatus = 'pending' | 'accepted' | 'blocked';
function isValidFriendshipStatus(status: any): status is TFriendshipStatus {
   return ['pending', 'accepted', 'blocked'].includes(status);
}

export const createFriendRequest = async ({ inviterId, inviteeId }: IFriendRequest) => {
   try {
      if (!inviterId && !inviteeId) throw new Error('Missing request data.');

      // avoid duplicate requests
      const currUserRequests = await Friendship.find({ inviterId });
      const isDuplicateRequest = currUserRequests.some((r) => {
         return r.inviteeId === inviteeId;
      });
      if (isDuplicateRequest) throw new Error('Request already exists.');

      const requestData = {
         id: uuidv4(),
         inviterId,
         inviteeId,
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

export const fetchUserFriendships = async (userId: string) => {
   try {
      const userConnections = await Friendship.find({
         $or: [
            { inviterId: userId },
            { inviteeId: userId }
         ]
      });
      return userConnections;
   } catch (error) {
      const errorMessage = (error as Error);
      throw new Error('Failed to fetch all users: ' + errorMessage);
   }
};

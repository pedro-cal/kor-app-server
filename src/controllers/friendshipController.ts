import Friendship from '../models/FriendshipModel';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/UserModel';

interface IFriendRequest {
  inviterId?: string;
  inviteeId?: string;
}

type TFriendshipStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';
function isValidFriendshipStatus(status: string): status is TFriendshipStatus {
  return ['pending', 'accepted', 'blocked'].includes(status);
}

export const createFriendRequest = async ({
  inviterId,
  inviteeId,
}: IFriendRequest) => {
  try {
    if (!inviterId && !inviteeId) throw new Error('Missing request data.');

    // avoid duplicate requests
    const currUserRequests = await Friendship.find({ inviterId });
    const isDuplicateRequest = currUserRequests.some(r => {
      return r.inviteeId === inviteeId;
    });
    if (isDuplicateRequest) throw new Error('Request already exists.');

    const requestData = {
      id: uuidv4(),
      inviterId,
      inviteeId,
      status: 'pending',
    };
    const newRequest = new Friendship(requestData);
    await newRequest.save();

    return newRequest;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error('Failed to create friendship request: ' + errorMessage);
  }
};

export const updateFriendRequest = async (
  inviterId: string,
  inviteeId: string,
  status: TFriendshipStatus,
) => {
  try {
    if (!inviterId || !inviteeId || !status) throw new Error('Missing request update data.');
    if (!isValidFriendshipStatus(status)) throw new Error('Invalid friendship status.');

    const updatedRequest = await Friendship.findOneAndUpdate(
      { inviterId, inviteeId },
      { status },
      { new: true },
    );
    return updatedRequest;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error('There was a problem updating request: ' + errorMessage);
  }
};

export const fetchUserFriendships = async (userId: string) => {
  try {
    const userConnections = await Friendship.find({
      $or: [{ inviterId: userId }, { inviteeId: userId }],
    }).lean();

    const userStatusMap = new Map<string, string>();
    const userIsInviterMap = new Map<string, boolean>();

    userConnections.forEach(connection => {
      if (connection.inviterId !== userId) {
        userStatusMap.set(connection.inviterId, connection.status);
        userIsInviterMap.set(connection.inviterId, true);
      }
      if (connection.inviteeId !== userId) {
        userStatusMap.set(connection.inviteeId, connection.status);
        userIsInviterMap.set(connection.inviteeId, false);
      }
    });

    const uniqueUserIds = Array.from(new Set([...userStatusMap.keys(), ...userIsInviterMap.keys()]));

    const users = await User.find({
      id: { $in: uniqueUserIds }
    }).lean();

    const usersWithDetails = users.map(user => ({
      ...user,
      friendStatus: userStatusMap.get(user.id),
      isInviter: userIsInviterMap.get(user.id),
    }));

    return usersWithDetails;
  } catch (error) {
    const errorMessage = error as Error;
    throw new Error('Failed to fetch all users: ' + errorMessage);
  }
};

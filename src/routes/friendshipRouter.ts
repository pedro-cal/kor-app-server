import { Router } from 'express';
import {
  createFriendRequest,
  fetchUserFriendships,
  updateFriendRequest,
} from '../controllers/friendshipController';

const router = Router();

// create a friend request
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newFriendRequest = await createFriendRequest(body);
    res.status(200).json(newFriendRequest);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});
// get all friends
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (typeof id !== 'string') {
    return res.status(400).send('Invalid parameter. Id should be a string.');
  }
  const friends = await fetchUserFriendships(id);
  res.status(200).json(friends);
});

// update one by id
router.put('/', async (req, res) => {
  try {
    const { inviterId, inviteeId, status } = req.body;
    const updatedRequest = await updateFriendRequest(inviterId, inviteeId, status);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;

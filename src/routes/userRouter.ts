import { Router } from 'express';
import {
  signUser,
  fetchAllUsers,
  batchCreateUsers,
  updateUserStatus,
} from '../controllers/userController';

const router = Router();

// create user
router.post('/', async (req, res) => {
  const { username, email, imgUrl } = req.body;
  try {
    const newUser = await signUser({ username, email, imgUrl });
    console.log('🚀 ~ router.post ~ newUser:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});
// batch create users
router.post('/batch', async (req, res) => {
  const users = req.body.users;
  try {
    const newUsers = await batchCreateUsers(users);
    res.status(201).json(newUsers);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});
// get all users
router.get('/', async (req, res) => {
  try {
    const allUsers = await fetchAllUsers();
    console.log('🚀 ~ router.get ~ allUsers:', allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});
// get user by id
// router.get('/:id', (req, res) => {
//    res.status(200).json({ message: 'users get ok' });
// })

// update user by id
router.put('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🚀 ~ router.put ~ id:', id);
    if (typeof id !== 'string') {
      // Handle the error or convert the type
      return res.status(400).send('Invalid parameter. Id should be a string.');
    }
    const { status } = req.body;
    const updatedUser = await updateUserStatus(id, status);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});
// delete user by id
// router.delete('/:id', (req, res) => {
//    res.status(200).json({ message: 'users get ok' });
// })

export default router;

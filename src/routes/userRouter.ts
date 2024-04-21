import { Router } from "express";
import { createUser, fetchAllUsers, batchCreateUsers, updateUserStatus } from "../controllers/userController";

const router = Router();

// create user
router.post('/', async (req, res) => {
   const { username, email, imgUrl } = req.body;
   try {
      const newUser = await createUser({ username, email, imgUrl });
      res.status(201).json(newUser);
   } catch (error) {
      res.status(400).json({ error });
   }
})
// batch create users
router.post('/batch', async (req, res) => {
   const users = req.body.users;
   try {
      const newUsers = await batchCreateUsers(users);
      res.status(201).json(newUsers);
   } catch (error) {
      res.status(400).json({ error });
   }
})
// get all users
router.get('/', async (req, res) => {
   const allUsers = await fetchAllUsers();
   res.status(200).json(allUsers);
})
// get user by id
// router.get('/:id', (req, res) => {
//    res.status(200).json({ message: 'users get ok' });
// })

// update user by id
router.put('/status/:id', async (req, res) => {
   const id = req.query;
   if (typeof id !== 'string') {
      // Handle the error or convert the type
      return res.status(400).send('Invalid parameter. Id should be a string.');
   }
   const { status } = req.body;
   const updatedUser = await updateUserStatus(id, status);
   res.status(200).json(updatedUser);
})
// delete user by id
// router.delete('/:id', (req, res) => {
//    res.status(200).json({ message: 'users get ok' });
// })

export default router;
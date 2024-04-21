import { Router } from "express";
import { createFriendRequest, updateFriendRequest } from "../controllers/friendshipController";

const router = Router();

// create one
router.post('/', async (req, res) => {
   try {
      const body = req.body;
      const newFriendRequest = await createFriendRequest(body);
      res.status(200).json(newFriendRequest);
   } catch (error) {
      res.status(400).json({ error: (error as Error).message });
   }
})
// get all
router.get('/', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})
// get one by id
router.get('/:id', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})
// update one by id
router.put('/:id', async (req, res) => {
   try {
      const { id } = req.params;
      if (typeof id !== 'string') {
         // Handle the error or convert the type
         return res.status(400).send('Invalid parameter. Id should be a string.');
      }
      const { status } = req.body;
      const updatedRequest = await updateFriendRequest(id, status);
      res.status(200).json(updatedRequest);
   } catch (error) {
      res.status(400).json({ error: (error as Error).message });
   }
})
// delete one by id
router.delete('/:id', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})

export default router;
import { Router } from "express";

const router = Router();

// create user
router.post('/', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})
// get all users
router.get('/', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})
// get user by id
router.get('/:id', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})
// update user by id
router.put('/:id', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})
// delete user by id
router.delete('/:id', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})

export default router;
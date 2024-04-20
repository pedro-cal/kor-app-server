import { Router } from "express";

const router = Router();

// create one
router.post('/', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
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
router.put('/:id', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})
// delete one by id
router.delete('/:id', (req, res) => {
   res.status(200).json({ message: 'users get ok' });
})

export default router;
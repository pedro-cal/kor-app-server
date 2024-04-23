import { Router } from 'express';
import { fetchPostsByUserId, createPost } from '../controllers/postController';

const postsRouter = Router();

// Fetch posts by user ID
postsRouter.get('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const posts = await fetchPostsByUserId(id);
      res.status(200).json(posts);
   } catch (error) {
      res.status(400).json({ error: (error as Error).message });
   }
});

// Submit a new post
postsRouter.post('/', async (req, res) => {
   const { statusText, userId } = req.body;  // Ensure these fields are expected as part of your post body
   try {
      const newPost = await createPost({ statusText, userId });
      res.status(201).json(newPost);
   } catch (error) {
      res.status(400).json({ error: (error as Error).message });
   }
});

export default postsRouter;

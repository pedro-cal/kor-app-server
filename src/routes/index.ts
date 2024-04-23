import { Router } from 'express';
import userRouter from './userRouter';
import friendshipRouter from './friendshipRouter';
import postsRouter from './postsRouter';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/friend', friendshipRouter);
mainRouter.use('/posts', postsRouter);

export default mainRouter;

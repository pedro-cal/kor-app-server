import { Router } from 'express';
import userRouter from './userRouter';
import friendshipRouter from './friendshipRouter';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/friend', friendshipRouter);

export default mainRouter;
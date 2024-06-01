import express from 'express'

import { db_connection } from './DB/connection.js'
import { User } from './DB/models/user.model.js'
import { Post } from './DB/models/post.model.js';
import { Comment } from './DB/models/comment.model.js';

import userRouter from './src/modules/users/user.routes.js';
import postRouter from './src/modules/posts/post.routes.js';
import commentRouter from './src/modules/comments/comment.routes.js';
import specialRouter from './src/modules/specialEndPoints/specialEndPoints.routes.js'



const app = express();

db_connection();

app.use(express.json());

User;
Post;
Comment;

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/special', specialRouter)

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
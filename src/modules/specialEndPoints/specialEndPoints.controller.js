import { Post } from "../../../DB/models/post.model.js";
import { User } from "../../../DB/models/user.model.js";
import { Comment } from "../../../DB/models/comment.model.js";




export const specificUserWithSpecificPostAndComments = async (req,res,next)=>{
   
    const { userId, postId } = req.body;

    const user = await User.findByPk(userId);

    const post = await Post.findByPk(postId);

    const comments = await Comment.findAll({where:{
        PostId:post.id
    }});

    if(user && post && comments && userId == post.author){
        return res.json({
            user,
            post,
            comments
        });
    }

    res.json('something wrong try again!');

    
}

export const specificPostWithTheAuthor = async (req,res,next) => {

    const { postId } = req.body;

    const post = await Post.findByPk(postId);

    const user = await User.findByPk(post.author);

    if(post && user){
         return res.json({
            post:post,
            author: user
         });
    }

    res.json("Can't find this post by ID");
}
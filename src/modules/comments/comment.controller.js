import { Post } from "../../../DB/models/post.model.js";
import { User } from "../../../DB/models/user.model.js";
import { Comment } from "../../../DB/models/comment.model.js";


export const create = async (req,res,next)=>{
    
    const {PostId, UserId, content} =req.body;

    const user = await User.findByPk(UserId);

    const post = await Post.findByPk(PostId);


    if(user && post && user.loggedIn == "true"){
        const comment = await Comment.create(
            {
                content,
                UserId,
                PostId
            }
        );
       return  res.json({message:"Comment Added successfully",comment});
    }
    
    res.json("something went wrong! ");
   
}

export const reading = async (req,res,next)=>{
    const {commentId} =req.body;

    const comment = await Comment.findByPk(commentId);

    const post = await Post.findByPk(comment.dataValues.id);


    if(comment && post && comment.isDeleted == 'false' && post.isDeleted == 'false'){
       return res.json({content:comment.content,comment:comment});
    }
    res.json("sorry, No comment or post with this ID ");
}

export const updating = async (req,res,next)=>{

    const {userId, postId, commentId, content } = req.body;
    
    const user = await User.findByPk(userId);

    const post = await Post.findByPk(postId);

    const comment = await Comment.findByPk(commentId);


    if(user && post && comment && userId == post.author && post.author == comment.UserId && comment.PostId == postId && post.isDeleted == 'false' && comment.isDeleted == 'false' ){
        if(content){
          const updatedComment = await Comment.update(
            {
                content:content
            },
            {
                where:{
                    id:commentId
                }
            }
           );

           return res.json({message:"Comment updated successfully",affectedRows:updatedComment,updatedComment:await Comment.findByPk(commentId)});
        }else{
            return res.json({message:"Initialize all fields"});
        }
    }else {
        return res.json({message:"Can't find this comment or Unauthorized User"});
    }

}

export const deleting = async (req,res,next)=>{
    
    const {userId,postId,commentId} = req.body;

    const user = await User.findByPk(userId);

    const post = await Post.findByPk(postId);

    const comment = await Comment.findByPk(commentId);


    if(user && post && comment && userId == post.author && post.author == comment.UserId && comment.PostId == postId && post.isDeleted == 'false' && comment.isDeleted == 'false'){
        const deletedComment = await Comment.update(
            {isDeleted: "true"},
            {
                where:{
                    id:commentId
                }
            }
        );

        return res.json({message:"Comment deleted successfully", deletedComment: await Comment.findByPk(commentId)});
    }

    res.json({message: "Can't find this comment or Unauthorized User"});
}
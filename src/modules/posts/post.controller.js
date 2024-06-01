import { Post } from "../../../DB/models/post.model.js";
import { User } from "../../../DB/models/user.model.js";


export const create = async (req,res,next)=>{
    
    const {author, title, content} =req.body;

    const user = await User.findByPk(author);

    if(user && user.loggedIn == "true"){
        const post = await Post.create(
            {
                title,
                content,
                author
            }
        );
       return  res.json({message:"Post Added successfully",post});
    }
    
    res.json("something went wrong! ");
   
    
}

export const reading = async (req,res,next)=>{
    const {postId} =req.body;

    const post = await Post.findByPk(postId);

    if(post && post.isDeleted == 'false'){
       return res.json({content:post.content,post:post});
    }
    res.json("sorry, No post with this ID ");
}

export const updating = async (req,res,next)=>{

    const {userId, postId, title, content } = req.body;
    
    const user = await User.findByPk(userId);

    const post = await Post.findByPk(postId);

    if(user && post && userId == post.author && post.isDeleted == "false" ){
        if(title && content){
          const updatedPost = await Post.update(
            {
                title:title,
                content:content
            },
            {
                where:{
                    id:postId
                }
            }
           );

           return res.json({message:"Post updated successfully",affectedRows:updatedPost,updatedPost:await Post.findByPk(postId)});
        }else{
            return res.json({message:"Initialize all fields"});
        }
    }else {
        return res.json({message:"Can't find this post or Unauthorized User"});
    }

}

export const deleting = async (req,res,next)=>{
    
    const {userId,postId} = req.body;

    const user = await User.findByPk(userId);

    const post = await Post.findByPk(postId);


    if(user && post && userId == post.author){
        const deletedPost = await Post.update(
            {isDeleted: "true"},
            {
                where:{
                    id:postId
                }
            }
        );

        return res.json({message:"Post deleted successfully", deletedPost: await Post.findByPk(postId)});
    }

    res.json({message: "Can't find this post or Unauthorized User"});
}
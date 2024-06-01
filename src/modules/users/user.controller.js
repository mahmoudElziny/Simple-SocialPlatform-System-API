import { User } from "../../../DB/models/user.model.js";
import bcrypt, { hashSync } from 'bcrypt'


export const registration = async (req,res,next)=>{

    let {userName, email, password} = req.body;

    password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8)); 

    console.log(password);

    const user = await User.findOrCreate({
        where: {email},
        defaults: {userName,email,password},
    });

    if(!user[1]){
        return res.json({message: 'User already exists'});
    }

    res.json({message: 'User Added Successfully',user});
}

export const login = async (req,res,next)=>{

    const {email, password} = req.body;

    const user = await User.findOne({
        where: {
            email:email
        }
    }
    );

    const checkPassword = bcrypt.compareSync(password,user.password);

    if(checkPassword){
        await User.update(
            {loggedIn: 'true'},
            {
                where: {
                    email: email
                }
            }
        );
        return res.json({message:'Logged in Successfully', greeting:`Hello ${user.userName}!!`}); 
    }

    res.json({message:'wrong email or password'});
}

export const logout = async (req,res,next)=>{

    const {email} = req.body;

    const user = await User.update(
        {loggedIn:'false'},
        {
            where: {
                email: email
            }
        }
    );
    console.log(user);
    if(user[0]){
        return res.json({message:'Logout Successfully'}); 
    }

    res.json({message:'something went wrong'});
}
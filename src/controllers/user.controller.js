
import User from '../models/User';
import jwt from 'jsonwebtoken'
import config from '../config'


export const login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email: email})
    
    if(!user) res.status(422).json({message: 'this email does not exist'})
    const verify = await User.comparePassword(password, user.password)
    if(!verify) res.status(422).json({message: 'Password not match'})
    const token = jwt.sign({id: user._id},config.SECRET,{
        expiresIn: 86400
    })
    res.status(200).json({
        token : token
    })
};
export const register = async (req,res)=>{
    console.log(req.body)
    const {name, email, password, cellphone, country , state} = req.body
    const userData = User.find({email});
    

    const newUser = new User({
        name,
        password: await User.encriptPassword(password),
        email,
        cellphone,
        country,
        state
    })
    try {
        
        let response = await newUser.save()
        console.log(response)
        
        const token = jwt.sign({id: response._id},config.SECRET,{
            expiresIn: 86400
        })
        res.status(200).json({
            token : token
        })
    } catch (error) {
        
        console.log(newUser.password)
        res.status(422).json({
            message : `An error has been occuried ${error}`
        })
    }
};
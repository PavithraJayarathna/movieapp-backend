const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = async (req, res) =>{
    try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({message: "User is not registered"});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.json({message: "Password is incorrect"});
    }

    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly: true,maxAge: 360000});
    return res.json({status:true, message: "Login successfully"})
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message})

    }
}

module.exports = login;
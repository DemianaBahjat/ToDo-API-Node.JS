const userModel = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser=async function(req,res){
 
  try{
    var user = req.body
    var user = await userModel.create(user)
    res.status(200).json(user)
  }catch(err){
        res.status(400).json({message: err.message})
  }
  
}
const getAllUser=async function(req,res){
  var user = await userModel.find()
  res.status(200).json(user)
}
const updateUser=async function(req,res){
    const {id}=req.params;
    const {userName}=req.body
    var user = await userModel.findByIdAndUpdate(id,{userName},{new:true})
    res.status(200).json(user)
  }

  const deleteUser=async (req, res) => {
    const {id} = req.params;
    const deleteUser= await userModel.findByIdAndDelete(id);
    res.json(deleteUser);
  }


  const login= async (req, res) =>{

     // req.body
       const{email, password} =req.body

    // check email password  ====> res email and password
    //  لان ممكن يكون اليوز بيستهبل ومش باعت حاجة اصلا او الايميل فاضي او الايميل بس او البسور بس
       
          if(!email || !password){
                return res(400).json({message: 'you must provide email and password'})
          }
     
   // find one email ==> res invalid email or password 

             const user =await userModel.findOne({email : email})
              if (! user){
                return res.status(404).json({message:' invalid email or password'})
              }
   // find one password ==> res invalid email or password 
         const isValid =await bcrypt.compare(password, user.password)
         if(! isValid){
           return res.status(401).json({message:'invalid email or password'})
         }

   /*
   login طب لو هو تمام يبقي من حقة يعمل 
       token وهرد علية بال 
   */
            
    
   const token =await jwt.sign(
    {data:{email: user.email, id: user._id ,role:user.role }}, 

    process.env.SECRET_KEY,

    { expiresIn: '1h' })

   res.status(200).json({message:' sign sussccfully' , token: token})


             
   }


 module.exports={createUser,getAllUser,updateUser,deleteUser,login}



 // environment variable

//Cross-origin resource sharing (CORS) is a mechanism for integrating applications. 


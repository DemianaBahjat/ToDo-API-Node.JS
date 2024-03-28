   
   const express =require('express')
   var router =express.Router()
    const{createUser,getAllUser,updateUser,deleteUser, login} =require('../controllers/users')
   const { auth,restrictTo } = require('../middlewares/auth')




   //save new todo
   router.post("/" ,createUser)

   router.get("/", auth, restrictTo('Admin') ,getAllUser)

   router.get("/",updateUser)
   router.patch("/", deleteUser)
   router.post("/login" , login)







   module.exports= router
  const express =require('express')
   var router =express.Router()
    const{createTodo,getAllTodo,getById,updateById} =require('../controllers/todos')
const { auth,restrictTo } = require('../middlewares/auth')




   //save new todo
   router.post("/" ,createTodo)
   router.get("/",auth, getAllTodo)
   router.patch("/",auth, restrictTo('Admin', 'User'), updateById)
   router.get("/",getById)
  




   module.exports= router
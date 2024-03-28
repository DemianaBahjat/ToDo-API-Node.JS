
   const{todoModel}= require('../models/todos')


//create or save
const createTodo = async (req, res,next ) =>{
     let newTodo =req.body
     newTodo.userId=req.id
    try{
      let insertedTodo = await todoModel.create(newTodo)
      console.log(insertedTodo);
      res.status(201).json({message:'success' , data :insertedTodo})
        
   } catch(err){
    next({status:'500' ,error:err})
        //req.status(400).json({message:err.message})
   }
  
  }

   // get all todos
   // get all todos
 const getAllTodo = async (req, res) => {
  try {
      let todo = await todoModel.find().populate('userId');
      res.status(200).json({data: todo});
  } catch (err) {
      res.status(500).json({message: err.message}); // Corrected the error handling syntax
  }
 };


      // get by Id
      const getById= async(req,res) =>{
         let{id}  = req.params
           try{
             let todo = await todoModel.findById(id)
 
             if(todo){
               res.status(200).json({data : todo})
             }
             else{
                res.status(400).json({message: "id doesn't exist"})
           }
        }
          catch(err){
              res.status(500).json({message: 'try again later'})
          }
 
     }
      
     // update by update
     const updateById =async (req,res) =>{
      let{id} =req.params
      let {title} = req.body
      
      try{
       let updatedTodo = await todoModel.findByIdAndUpdate(id , {title}, {new:true})
       res.status(200).json({data : updatedTodo})
      }
     catch(err){
          res.status(422).json({message: err.message})
     }
 }


module.exports= {createTodo, getAllTodo, getById,updateById}
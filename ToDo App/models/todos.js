
const mongoose =require('mongoose')


  let todosSchema=mongoose.Schema({
        title:{
            type:String,
            unique:true,
            minLength:3,
            maxLength:25,
            required:true,
            trim:true
        },
        status:{
            type:String,
            enum:["in progress" , "Done" , "to do"],
            default:"todo"
        },
        userId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"User"
        }
  },{timestamps:true})



    const todosModel=mongoose.model("Todo", todosSchema)



  module.exports= todosModel
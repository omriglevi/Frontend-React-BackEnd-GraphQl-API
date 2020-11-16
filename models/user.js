const mongoose= require ('mongoose');


const Schema=mongoose.Schema ;
const userSchema=new Schema({
email:{
    type:String ,
    required:true
} ,


password:{
    type:String ,
    required:true
},

createdEvents:[
    {
        type:Schema.Types.ObjectId   ,           // here we store all the events's IDs  that this user created
        ref:'Event'
    }
]
});
module.exports=mongoose.model('User' , userSchema);

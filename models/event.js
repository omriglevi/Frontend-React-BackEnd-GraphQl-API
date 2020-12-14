const mongoose=require('mongoose');
const Schema=mongoose.Schema ;

const eventSchema=new Schema({
    title:{
        type:String , 
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number , 
        required:true,
    },
    date:{
        type:Date , 
        required:true
    } ,
    creator:{
        type:Schema.Types.ObjectId ,   //users id NOT A User Object 
        ref: 'User'
    } , 
    bookings:[
        {
            type:Schema.Types.ObjectId  , 
            ref : 'Booking'
        }
       
]

});
module.exports=mongoose.model('Event' , eventSchema);
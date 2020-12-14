const Event =require('../../models/event');
const User=require('../../models/user');
const Booking =require('../../models/booking');
const {dateToString}=require('../helpers/date');



//___________PRETTIFIER FUNCTIONS FOR DB__________
// FUNCTIONS  FOR PULLING INFO FROM DB , AND RETURNS NESTED AND PRETTY NEW OBJECT

const bookings =async  bookingsIds=>{
    //this helper gets a list (Array[]) of Ids , finds them in DB and returns a pretty version of them with nesting 
   try {
    const bookings =await  Booking.find({_id:{ $in:bookingsIds}})
    return bookings.map(booking=>{
        return transformBookings(booking);
    })
   } catch (error) {
       console.log(error);
   }
   
}

const transformEvent= event=>{   // getting event from DB and prettifies it + nesting it
    return {
       ...event._doc ,
        date:dateToString(event._doc.date),
         _id:event.id , 
         creator:user.bind(this , event.creator),
         bookings:bookings.bind(this , event.bookings) 
       };

};





const transformBookings = booking =>{ //getting booking ,prettifies it and nesting it
    return {...booking._doc ,
        _id:booking.id , 
        user:user.bind(this , booking.user),
        event:singleEvent.bind(this , booking._doc.event),
        createdAt:dateToString(booking._doc.createdAt) , 
      updatedAt:dateToString(booking._doc.updatedAt)
                               
   
   
   } 
}







const singleEvent = async eventId=>{
 // this helper finds an event by id and sent it in a pretty and nested object
    try {
     const event = await Event.findById(eventId)
     if ( !eventId)
     {
         throw "empty Id field"
     }
     return transformEvent(event);
    } catch (error) {
        return error ;
    }
 }
 
 
 const events =async  eventsIds=>{
     //this helper gets a list (Array[]) of Ids , finds them in DB and returns a pretty version of them with nesting 
     return Event.find({_id:{ $in:eventsIds }})
     .then(events=>{
         return events.map(event=>{
             return  transformEvent(event)
         }
             )
     })
     .catch(err=>{
                 throw err})
 }
 
 
 
 const user= async userId=>{
    return User.findById(userId)
    .then(user=>{
        return {
            ...user._doc ,
             _id:userId , 
             password:null ,
             createdEvents:events.bind(this , user._doc.createdEvents)
         }
    })
    .catch(err=>{
        throw err;
    })
 }


//__________END OF PRETTIFIER FUNCTIONS____



//  exports.user=user ;
//  exports.events=events ;
//  exports.singleEvent=singleEvent ;
 exports.transformEvent=transformEvent ;
 exports.transformBookings=transformBookings ;

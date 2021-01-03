
const Booking= require('../../models/booking');
const Event= require('../../models/event');
const {transformBookings} = require('./dataMerging');


       module.exports= {
        
         bookings: async (args , req)=>{
            if(!req.isAuth){
                throw new Error("YOU DONT HAVE ACCES - UNAUTH");
            }
             try {
                 const bookings = await Booking.find();
                    return bookings.map(booking=>{
                        return transformBookings(booking)
                    })
             } catch (error) {
                 throw error
             }
         } , 


         cancelBooking: async (args, req)=>{
            if(!req.isAuth){
                throw new Error("YOU DONT HAVE ACCES - UNAUTH");
            }
          try {
              const booking= await Booking.findById(args.bookingId).populate('event');
                const event =transformEvent(booking.event) ;
                const result= await Booking.deleteOne({_id:args.bookingId});
                if (result.deletedCount!==1)
                {
                    throw "failed to delete this item"
                }
                console.log(result.deletedCount);
                return event
          } catch (error) {
              
          }
         } ,


bookEvent: async (args,req)=>{
    if(!req.isAuth){
        throw new Error("YOU DONT HAVE ACCES - UNAUTH");
    }
    console.log(args.eventId)
    const fetchedEvent= await Event.findById({_id:args.eventId});
    if(!fetchedEvent || Object.keys(fetchedEvent)===0){
        throw "empty event"
    }
    if(fetchedEvent.maxBookings <= fetchedEvent.bookings.length)
    {
        
        throw new Error("Sorry but this class is already fully booked")
    }
    const booking = new Booking({
    event: fetchedEvent ,
    user:req.userId
})

const result= await booking.save()

const event=await Event.findById(args.eventId);
        if(!event)
        {
            throw new Error("Event  was not found oooofff");
        }
        console.log(event.bookings);
        event.bookings.push(result._id);
        console.log(event.bookings);
      const bookingsUpdateRes= await event.save();
      console.log(bookingsUpdateRes);



       



return transformBookings(result) 
} 


         
     }
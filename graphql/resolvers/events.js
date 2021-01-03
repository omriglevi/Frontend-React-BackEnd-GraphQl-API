
const Event=require('../../models/event');
const {transformEvent}= require('./dataMerging')
const User=require('../../models/user')


module.exports= {
    events: async ()=>{
        return Event.find()
         .then(events=>{
             return events.map(event=>{
                return transformEvent(event);   // might need to override these fields:  _id :event.id and creator:...event._doc.creator._doc
             });
         })
         .catch(err=>{ 
             throw err;
         })  // gives all the Events in the DB
     },
    


     createEvent:async (args,req)=>{
         if(!req.isAuth){
             throw new Error("YOU DONT HAVE ACCES - UNAUTH");
         }
         const event=new Event({
                
            title:args.eventInput.title,
            description:args.eventInput.description,
            price: +args.eventInput.price , 
            date: new Date(args.eventInput.date) , 
            creator:req.userId  ,
            maxBookings: +args.eventInput.maxBookings
            
        });

        
        try {
            const result=await event.save();
        const createdEvent=transformEvent(result);
        const creator=await User.findById(req.userId);
        if(!creator)
        {
            throw new Error("User was not found");
        }
        creator.createdEvents.push(createdEvent);
        await creator.save()
        return createdEvent
        } catch (error) {
            throw error
        }
     },

    



 }
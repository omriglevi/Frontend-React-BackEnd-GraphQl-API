const express=require('express');
const bodyParser=require('body-parser');
const graphqlHttp=require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose=require('mongoose')
const Event=require('./models/event');
const User=require('./models/user');
const bcrypt=require('bcryptjs');
const event = require('./models/event');
const app=express();

app.use(bodyParser.json());
const events =async  eventsIds=>{
    return Event.find({_id:{ $in:eventsIds }})
    .then(events=>{
        return events.map(event=>{
            return {
            ...event._doc,
            _id:event.id , 
            creator:user.bind(this,event.creator)
            }
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

app.use(
    '/graphql' ,
     graphqlHttp.graphqlHTTP({
    schema:buildSchema(`

    type Event{
        _id: ID!
        title:String!
        description:String!
        price: Float!
        date: String!
        creator:User!
       
    }


    type User{
        _id:ID!
        email:String!
        password:String 
        createdEvents:[Event!]
        

    }

    input UserInput{
        email:String!
        password:String!
    }

    input EventInput{
        title:String!
        description:String!
        price: Float!
        date: String!
    }

type RootQuery{
    events: [Event!]!
}


type RootMutation{
createEvent(eventInput:EventInput):Event
createUser(userInput:UserInput):User
}

    schema{
        query:RootQuery
        mutation:RootMutation
    }
    `)  , 
    rootValue:{
        events: async ()=>{
           return Event.find()
            .then(events=>{
                return events.map(event=>{
                    return{...event._doc ,
                         _id:event.id ,
                         creator:user.bind(this , event._doc.creator)
                        };   // might need to override these fields:  _id :event.id and creator:...event._doc.creator._doc
                });
            })
            .catch(err=>{ 
                throw err;
            })  // gives all the Events in the DB
        },
        createEvent: async (args)=>{
           
            const event=new Event({
                   
                title:args.eventInput.title,
                description:args.eventInput.description,
                price: +args.eventInput.price , 
                date: new Date(args.eventInput.date) , 
                creator:"5fac994fa21b4fe36817b7b6"
            });
            let createdEvent ; 
       return event
       .save()
       .then(result=>{
            createdEvent={...result._doc };
                return User.findById("5fac994fa21b4fe36817b7b6")
                 
              })
              .then(user=>{
                  if(!user){
                      throw new Error("User Does Not Exists");
                  }
                  user.createdEvents.push(event);
                  return user.save();
              })
              .then(result=>{
                return createdEvent;
              })
              .catch(err=>{
                  console.log(err);
                  throw err
                }); 

              
        },
        createUser:async args=>{
           return User.findOne({email:args.userInput.email})
           .then(user=>{
                if(user)
                {
                    throw new Error('User is already exists') ; /// if user exists
                }
                return bcrypt
                .hash(args.userInput.password , 12)
           
            })
            
            .then(hashedPassword=>{
                const user=new User({
                    email:args.userInput.email ,
                    password:hashedPassword
                });
               return user.save();
            })
            .then(result=>{
                return {...result._doc ,password:null , _id:result.id};  //we rerwite the password that we send to the frontend and make it null
            })
            .catch(err=>{
                throw err;
            });
            
        }
    } ,
   graphiql:true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6nswm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(()=>{
app.listen(3000); /// if connection to DB secceded then start the server
}).catch(err=>console.log(err));



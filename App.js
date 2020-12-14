const express=require('express');
const bodyParser=require('body-parser');
const graphqlHttp=require('express-graphql');
const mongoose=require('mongoose')
const grapQlSchema=require('./graphql/scheme/index');
const graphQlResolvers=require('./graphql/resolvers/index');
const isAuth=require('./middleware/is-Auth')
const app=express();

app.use(bodyParser.json());
app.use((req , res , next)=>{
  res.setHeader('Access-Control-Allow-Origin' , "*") ;
  res.setHeader('Access-Control-Allow-Methods' , "POST,GET,OPTIONS") ;
  res.setHeader('Access-Control-Allow-Headers' , "Content-Type,Authorization")
if(req.method==='OPTIONS')
{
  return res.sendStatus(200);
}
next();
})
app.use(isAuth); /// runs on any incoming req dosnt throw errors just sets auth

app.use(
    '/graphql' ,
     graphqlHttp.graphqlHTTP({
    schema:grapQlSchema , 
    rootValue: graphQlResolvers,
   graphiql:true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6nswm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(()=>{
app.listen(3001); /// if connection to DB succeded then start the server
}).catch(err=>console.log(err));



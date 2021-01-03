import React , {useContext, useState } from 'react';
import './AuthPage.css';
import logo from './logo.png'
import AuthContext from '../context/auth-context';
import { Col, Row } from 'react-bootstrap';





export default function Authpage(props) { 
const [email , setEmail]=useState(" ");
const [password , setPassword]=useState(" ");
const [isLogin , setIsLogin]=useState(true);
const context = useContext(AuthContext);




const swithmodeHandler=()=> { setIsLogin(!isLogin)}


    const submitHandler=async (e)=>{
       
        e.preventDefault();
      let requestBody  ={
            query:
  `
            query{
                login(email:"${email}" , password:"${password}")
                {
                    userId
                    token
                    tokenExpiration
                }
            }
            `
            

        }

        if(isLogin){
            requestBody={
                query:` 
                
                
                mutation{
                    createUser(userInput:{email:"${email}" , password:"${password}" })
                    {
                        _id
                        email
                    }
                }`
            }
        }
        
try {
    
   const requestToGql = await fetch('http://localhost:3001/graphql' , {
        method:'POST' , 
        body:JSON.stringify(requestBody) ,
        headers:{
            'Content-Type': 'application/json'

        }})

        if(requestToGql.status!==200 && requestToGql.status!==201){
            throw new Error("Failed creating user");
        }
        const resData=await requestToGql.json() ;
       

       if((Object.keys(resData.data.login) !==0) || resData.data.login.token){
           context.login(resData.data.login.userId,
            resData.data.login.token, 
            resData.data.login.tokenExpiration
            ) ;
       }
return resData ;

} catch (error) {
    console.log(error)
}
   


       /* ---SAME PROCCESS AS THE TRY CATH BUT DIFFERENT SYNTAX(OLDER)--- */
// const requestToGql = await fetch('http://localhost:3001/graphql' , {
//         method:'POST' , 
//         body:JSON.stringify(requestBody) ,
//         headers:{
//             'Content-Type': 'application/json'
        // }}) 
        // .then(res=>{
        //     if(res.status !==200&&res.status!==201)
        //     {
        //         throw new Error("Failed creating user")
        //     }
        //     return res.json()
        // })
        // .then(resData=>{
        //     console.log(resData);
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        
        

        
      
     




    }
    
return <form className="auth-form" onSubmit={submitHandler}>
   
   <Row>
       <Col> </Col>
       <Col> <img src={logo}  width="100"
        height="100" alt='logo' /> </Col>

        <Col></Col>
 
       </Row> 
    <div className="form-control2">  
        <input placeholder="Email" value={email}  type="email" id="email"  onChange={e=>setEmail(e.target.value)}/>
    </div>
    <div className="form-control2">
       
        <input placeholder="Password" value={password} type="password" id="password"  onChange={e=>setPassword(e.target.value)}/>
    </div>
    <div className="form-actions">
    <button type="submit"> Submit</button>
    <button  onClick={swithmodeHandler} type="button"> {isLogin? "Signup" : "Login"}</button>
    


    </div>
</form>

}


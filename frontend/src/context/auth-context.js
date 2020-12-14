
import React ,{  createContext} from 'react' ;


 const context= createContext({
    userId:null,
    token: null ,
    login: (userId, token )=> {} , 
    logout: ()=>{} 
});

export default context ;
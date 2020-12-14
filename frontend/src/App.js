
import './App.css';
import { useState , useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './context/auth-context';
import LayOut from './Layout'






function App() {
 
  const[token , setToken] =useState(null) ;
  const[userId , setUserId] =useState(null);




  const login=( userId ,token)=>{
      setUserId(userId);
    setToken(token) ;
  
  }
  const logout=()=>{
    setUserId(null);
    setToken(null);
  }


  const updateAndRender =useMemo(() => ( {
    token:token , 
    userId:userId ,
    login:login,
    logout:logout 
  }
    
  ), [setToken , userId , login]);








  return (
    
    <AuthContext.Provider 
    value={updateAndRender}
    >
      <LayOut/>
      </AuthContext.Provider>

    
  );
}

export default App;

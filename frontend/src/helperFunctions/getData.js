const getData= async (reqBody)=>{


    const requestToGql = await fetch('http://localhost:3001/graphql' , {
        method:'POST' , 
        body:JSON.stringify(reqBody) ,
        headers:{
            'Content-Type': 'application/json'

        }})

        if(requestToGql.status!==200 && requestToGql.status!==201){
            throw new Error("Failed creating user");
        }
        const resData=await requestToGql.json() ;
        return resData;




}

export default getData;
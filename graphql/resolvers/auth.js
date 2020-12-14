


const User=require('../../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');





module.exports= {
        
    


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
        
    } , 

    login:async ({email , password  })=>{
        const user =await User.findOne({email:email});
        if(!user){
            throw new Error(" USER NOT FOUND IN DB")
        }
        const isEqual= await bcrypt.compare(password, user.password);
       
        if(!isEqual){
            throw new Error("Inco password");
        }
        const token =  jwt.sign({userId:user.id , email:user.email} , "somesupersecretkey" , { expiresIn: '1h' })
        return {
            userId:user.id ,
            token: token ,
            tokenExpiration : 1
        }
    
    }


}
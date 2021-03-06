const mongoose=require('mongoose');
const validator=require('validator');
const bycrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
            trim:true
        },
        age:{
            type:Number,
            default:0
        },
        email:{
            type:String,
            unique:true,
            required:true,
            trim:true,
            validate(value)// validating the entered email if it email type or not
            {
                if(!validator.isEmail(value))
                    throw new Error ('Email is invalid');
            }
        },
        password:{
            type:String,
            require:true,
            trim:true,
            validate(value)// validating for weak passwords 
            {
                if(value.length<6||value.toLowerCase()==="password")
                    throw new Error ('Passoword must be greater than 6 characters and not password')
            }
    
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }]
    },{
        timestamps:true
    }
);

// this used for login part where we will compare the hashed password to the password we are getting
userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email:email});
    if(!user)
    {
        throw new Error('Unable to login');
    }
    const isMatch=await bycrypt.compare(password,user.password);//this will compare the password to the hashed password

    if(!isMatch)
    {
        throw new Error('Unable to login');
    }

    return user;
}

// this method will generate the auth token save it in the user object
userSchema.methods.generateAuthToken=async function()
{
   const user=this;
   const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);// this will create a jwt for the given user
   user.tokens=user.tokens.concat({token:token})// adding the generated token to the tokens array
   await user.save();
   return token;
}

//overloading the .toJSON method
// this will delete extra information that we don't want to send in response
userSchema.methods.toJSON= function()
{
    const user=this;
    const userObject=user.toObject();

    delete userObject.password;// deleting the password field from the from the user object 
    delete userObject.tokens;// deleting the tokens array from the user object

    return userObject; 

    
}

// this will hash the password the every password is added or changed

userSchema.pre('save', async function (next) {
    
    const user = this;

    if (user.isModified('password')) {
        
        user.password = await bycrypt.hash(user.password, 8);
    }

    next();
});

const User=mongoose.model('User',userSchema)

module.exports=User;
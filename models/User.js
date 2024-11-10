const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt= require('bcrypt');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required: [true,"enter an email"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"enter a valid email"]

    },
    password:{
        type:String,
        required:[true,"enter a pasword"],
        minlength:[6,"minimum length of a password is 6 "]
    }
});

//after saving doc to db
userSchema.post('save',function (doc,next){
    console.log('New user created and saved ',doc);
    next();
})

//before saving doc to db
userSchema.pre('save',async function (next){
    console.log(this);
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    
    next();
})

// statics
userSchema.statics.login = async function(email,password){
    const user= await this.findOne({email});

    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');

    }
    throw Error('incorrect email');
}

const User = mongoose.model('user',userSchema);
module.exports=User;

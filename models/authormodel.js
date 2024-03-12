const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const authormodel = new mongoose.Schema({
    username:{
        type:String,
<<<<<<< HEAD
        required:[true,"Username is required"],
        minLength:[4,"Username should be 4 character long"],
=======
        required:[true,"username is required"],
        minLength:[4,"username should be 4 character long"],
>>>>>>> cceb5f5c898bea92e7723b2d481a2cc6decd19bc
    },
    name:{
        type:String,
        // required:[true,"Lastname is required"],
        minLength:[4," Name should be atleast 4 character long"],
    },
    contact:{
        type:String,
        // required:[true,"contact is required"],
        minLength:[10,"Contact is not valid"],
        maxLength:[10,"Contact is not valid"],
    },
    // city:{
    //     type:String,
    //     // required:[true,"City is required"],
    // },
    // gender:{
    //     type:String,
    //     enum:["male","female","others"],
    // },
    email:{
        type:String,
        unique:true,
        required:[true,"email is required"],
        // match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        select:false,
        maxLength:[15,"password should not exceed more than 15 characters"],
        minLength:[ 6 ,"password should not exceed more than 15 characters"],
        required:[true,"password is required"],
        // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]

    },
    // resetPasswordToken:{
    //     type: String,
    //     default:"0"
    // },
    // avatar:{
    //     type:Object,
    //     default:{
    //         field:"",
    //         url:"https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
    //     }

    // },
    books:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:"books"
        }
    ]

},{timestamps:true})

authormodel.pre("save", function(){
    if(!this.isModified("password")){
        return 
    }
    let salt = bcrypt.genSaltSync(10)
    this.password=bcrypt.hashSync(this.password,salt)
})

authormodel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
authormodel.methods.getjwttoken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

const author = mongoose.model("author",authormodel)
module.exports = author
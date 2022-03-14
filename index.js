const express=require('express');

const mongoose=require('mongoose');

const app=express();

app.use(express.json());

const connect=()=>{

    return mongoose.connect( "mongodb://127.0.0.1:27017/eval");
};

//user schema---->

const userSchema=mongoose.Schema(
    {
    firstName:{type:String,required:true},
    middleName:{type:String,required:false},
    lastName:{type:String,required:true},
    age:{type:Number,required:true},
    emails:{type:String,required:true},
    address:{type:String,required:true},
    gender:{type:String,required:false},
    type:{type:String,required:false},
    },
    {
        versionKey:false,
        timestamps:true,
    }
);
const User=mongoose.model("user",userSchema);

const branchSchema=mongoose.Schema(
{
    name:{type:String,required:true},
    address:{type:String,required:true},
    IFSC:{type:String,required:true},
    MICR:{type:String,required:true},

},

    {
        versionKey:false,
        timestamps:true,
    } 

    
);

const Branch=mongoose.model("branch",branchSchema);

const masterSchema=mongoose.Schema(
    {
        balance:{type:Number,required:true},
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
    },
    {
        versionKey:false,
        timestamps:true,
    } 
);

const Master=mongoose.model("master",masterSchema);

const savingSchema=mongoose.Schema(
    {
        accountNumber:{type:Number,required:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
    },

    {
        versionKey:false,
        timestamps:true,
    } 
)

const Saving=mongoose.model("saving",savingSchema);

const fixedSchema=mongoose.Schema(
    {
        accountNumber:{type:Number,required:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        startDate:{type:Number,required:true},
        maturityDate:{type:Number,required:true},

        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
    },
    
        {
            versionKey:false,
            timestamps:true,
        } 
    
);

const Fixed=mongoose.model("fixed",fixedSchema);

app.get("/master",async(req,res)=>{

    try{
        const maters=await Master.find().lean().exec();
        return res.status(200).send(masters);
    }
    catch(error){
        return res.send("something went wrong");
    }
}
)


app.listen(5000,async()=>{
    try{
        await connect();
    }
    catch(error){
        console.log(error);
    }
    console.log("listening on port 5000");
})
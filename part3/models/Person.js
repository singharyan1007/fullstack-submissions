require('dotenv').config();
const mongoose=require('mongoose');

let uniqueValidator=require('mongoose-unique-validator');

const url=process.env.MONGODB_URI;

console.log("Please wait !! Establishing connection with ",url);
mongoose.set('strictQuery');
mongoose.connect(url).then(()=>console.log("Connection successful"))
.catch(error=>console.log("Connection failed",error.message));

const personSchema=new mongoose.Schema({
    name:{
    type:String,
    required:[true,'Are you bloody nameless ?'],
    unique:true,
    minLength:[3,'Name must be atleast 3 characters']
  },
  number:{
    type:String,
    validate:{
      validator:function(v){
        return /^(\d{2,3}-\d+)$/.test(v);
      },
      required:[true,"Don't tell me you dont have a cell phone !!" ],
      minLength:[10,'Number must be of 10 digits']
    }
  }
})

personSchema.set('toJSON',{
  transform:(document,returnedObject)=>{
      returnedObject.id=returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v
  }
})
personSchema.plugin(uniqueValidator)
//mongoose.set('useCreateIndex', true)


module.exports = mongoose.model('Person', personSchema)

import express  from "express";
import bcrypt from 'bcrypt';
import {generate, verifyToken} from "./middleware/auth.js";
import env from 'dotenv';
import { connectDB } from "./config/mongodb.js";
import { userModel } from "./schemas/user.js";
env.config();

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin:'*'}))

app.post("/welcome", verifyToken, (req, res) => {
  const token = generate(req.user._id);
  res.status(200).send(token);
});

app.post("/login",async(req,res)=>{
  const {name,password} = req.body;
  if(!name||!password){
    res.status(403).send("aldaa");
    return;
  }
  const data = await userModel.find({name});
  const realPass = data[0]?.password;
  try{
    const real = await bcrypt.compare(password,realPass);
    if(real){
      const token = generate(data[0]._id);
      res.send(token);
      return;
    }
    res.status(403).send("wrong");
  }
  catch{
    res.status(403).send("error");
  }
});

app.post('/register', async(req,res)=>{
  const {name,retype, password} = req.body;
  if((!name||!password)||(password!=retype)){
    res.status(403).send("missing");
    return;
  }
  try {
    const exist = await userModel.find({name:name});
    if(exist.length!==0){ 
      res.status(403).send("already registered");
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    const data = {name,password:hash};
    const saved = await userModel.create(data);
    const token = generate(saved._id);
    res.send({token,id:saved._id});
    return;
  }
  catch(e){
    res.status(403).send(e);
    return;
  }
})

app.post('/products',verifyToken,(req,res)=>{
  const {name,category,price,img} = req.body;
  // productModel.create({});
})
  
app.listen(3000);
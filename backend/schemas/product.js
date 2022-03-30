import mongoose from "mongoose";
const Product = new mongoose.Schema({
      img:{
            type: String,
            required:true,
      },
      name:{
            type: String,
            required:true,
      },
      category:{
            type: String,
            required:true,
      },
      price:{
            type: Number,
            required:true,
      }
});

export const findProducts = async (name) =>{
      const productModel = mongoose.model(name, Product);
      const data = await productModel.find();
      return data;
}
export const addProducts = async (userName,img,name,category,price) =>{
      const productModel = mongoose.model(userName, Product);
      await productModel.create({img,name,category,price});
}
export const deleteAll = async (userName) =>{
      const productModel = mongoose.model(userName, Product);
      await productModel.remove();
}

export const getAll = async() =>{
      const productModel = mongoose.model('products', Product);
      return await productModel.find();
}
// const add = async () =>{
//       const productModel = mongoose.model('products', Product);
//       await productModel.insertMany(data).then((doc)=>console.log(doc));
// }
// add();
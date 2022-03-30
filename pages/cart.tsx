import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import Header from "../components/header";
import Item from "../components/item";
import { Context, itemType } from "../components/provider";

const Cart = () => {
  const { products,setProducts,setCount} = useContext(Context);
  return (
    <div className="flex-col w-full px-20 pt-5">
      <Header />
      {products.length != 0 ? (
        <div className="flex flex-row">
          <div className="flex flex-row w-full flex-wrap justify-center">
          {products.map((item:itemType)=><Item img={item.img} name={item.name} category={item.category} price={item.price}/>)}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                const token = Cookies.get("token");
                axios
                  .post("http://localhost:3000/buy", { token })
                  .then(() =>{
                    setProducts([]);
                    setCount(0);
                    alert("done");
                  });
              }}
              className="w-64 h-10 rounded-sm   bg-purple-600 text-white"
            >
              Худалдан авах
            </button>
          </div>
        </div>
      ) : <div className="w-full h-full flex justify-center items-center">BUY something</div>}
    </div>
  );
};
export default Cart;

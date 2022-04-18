import axios from "axios";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context,itemType } from "./provider";

const Item: NextPage<itemType> = ({img,name,category,price}) => {
  const router = useRouter();
  const {setCount} = useContext(Context);
  const add = async() =>{
    const token = Cookies.get('token');
    const res = await (await axios.post("https://www.api.cool-meet.xyz/products", {token:token,name,category,price,img})).data;
    alert(res);
    setCount(old=>old+1);
  }
  return (
    <div
      className="flex flex-col items-center mx-5 cursor-pointer hover:bg-grey-100 relative"
      onClick={() =>{
        const token = Cookies.get('token');
        if (token!=undefined&&token!='undefined') add();
        else router.replace("/login");
      }}
    >
      <img src={img} />
      <p>{name}</p>
      <p>{category}</p>
      <p>{price} ₮</p>
      <div className="absolute inset-0 z-10 bg-white text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
        <img src="https://shoppy.mn/395bcb12a4e2b1d9f9364030d3ebe812.svg" />
      </div>
    </div>
  );
};

export default Item;

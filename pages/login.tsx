import axios from "axios";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [password,setPassword] = useState<string>("");
  const router = useRouter();
  const [name,setName] = useState<string>("");
  const [retype,setRetype] = useState<string>("");
  useEffect(()=>{
    const welcome = async () => {
      const token = Cookies.get("token");
      if (token!=undefined&&token!='undefined') {
        const data = await (
          await axios.post("http://localhost:3000/welcome", { token })
        ).data;
        if(data){
          Cookies.set('/token',data.token);
          router.replace("/");
        }
      }
    };
    welcome();
  },[]);
  const login = async()=>{
    try{
      const data = await (await axios.post('http://localhost:3000/login',{name,password})).data;
      Cookies.set('token',data.token);
      router.replace("/");
    }
    catch(e){
      console.log(e);
      alert('aldaa');
    }
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center px-16 pt-16 pb-16 bg-white shadow-2xl rounded-2xl ">
        <p className="text-2xl text-center">LOGIN</p>
        <input placeholder="name" className="mt-8 w-full py-1 px-2 rounded-lg border-purple-500 border-2 outline-none" onChange={(e)=>setName(e.target.value)}/>
        <input type={'password'} placeholder="password" className="mt-4 w-full py-1 px-2 rounded-lg border-purple-500 border-2 outline-none" onChange={(e)=>setPassword(e.target.value)}/>
        <button className="w-full bg-purple-400 mt-12 text-white py-3" onClick={()=>login()}>LOGIN</button>
        <p className="underline cursor-pointer" onClick={()=>router.replace("/register")}>register</p>
      </div>
    </div>
  );
};

export default Home;

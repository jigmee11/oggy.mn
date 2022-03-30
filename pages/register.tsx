import type { NextPage } from "next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const Home: NextPage = () => {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [retype, setRetype] = useState<string>("");
  const [loading, setLoading] = useState(false);
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
  const register = async () => {
    setLoading(true);
    try {
      const data = await (
        await axios.post("http://localhost:3000/register", {
          name,
          retype,
          password,
        })
      ).data;
      Cookies.set("token", data.token);
      setLoading(false);
      router.replace("/");
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert("aldaa");
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center px-16 pt-16 pb-16 bg-white shadow-2xl rounded-2xl ">
        <p className="text-2xl text-center">REGISTER</p>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="mt-8 w-full py-1 px-2 rounded-lg border-purple-500 border-2 outline-none"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type={"password"}
          className="mt-4 w-full py-1 px-2 rounded-lg border-purple-500 border-2 outline-none"
        />
        <input
          type={"password"}
          onChange={(e) => setRetype(e.target.value)}
          placeholder="retype password"
          className="mt-4 w-full py-1 px-2 rounded-lg border-purple-500 border-2 outline-none"
        />
        {loading ? (
          <p>loading</p>
        ) : (
          <button
            onClick={() => register()}
            className="w-full bg-purple-400 mt-12 text-white py-3"
          >
            REGISTER
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;

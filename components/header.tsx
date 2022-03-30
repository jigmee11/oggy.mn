import Cookies from "js-cookie";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { Context } from "./provider";

const Header: NextPage = () => {
  const router = useRouter();
  const [signed, setSigned] = useState("Нэвтрэх");
  const { count, setCount, setProducts,token } = useContext(Context);
  useEffect(() => {
    const welcome = async () => {
      const token = Cookies.get("token");
      if (token != undefined && token != "undefined") {
        const data = await (
          await axios.post("http://localhost:3000/welcome", { token: token })
        ).data;
        if (data) {
          setSigned(data.name);
          Cookies.set("token", data.token);
        }
      }
    };
    welcome();
    const getData = async () => {
      const token = Cookies.get("token");
      const data = await (
        await axios.post("http://localhost:3000/myproducts", { token: token })
      ).data;
      setCount(data.length);
      setProducts(data);
    };
    getData();
  }, []);
  return (
    <div className="flex flex-row justify-between w-full items-center">
      <p className="text-2xl text-indigo-500 font-bold cursor-pointer" onClick={()=>router.replace("/")}>oogy.mn</p>
      <input
        className="mx-10 px-4 w-full bg-gray-100 py-3"
        placeholder="search"
      />
      <div
        className="flex-col ml-5 flex items-center relative cursor-pointer"
        onClick={() => router.replace("/cart")}>
        <img src="https://shoppy.mn/395bcb12a4e2b1d9f9364030d3ebe812.svg" />
        <h6>Сагс</h6>
        <p>{count ? count : ''}</p>
      </div>
      <div
        className="flex-col ml-5 flex items-center cursor-pointer"
        onClick={() => {
          if (signed == "Нэвтрэх") router.replace("/login");
          else {
                setCount(0);
                setProducts([]);
            Cookies.set("token", "undefined");
            setSigned("Нэвтрэх");
          }
        }}
      >
        <img src="https://shoppy.mn/32143cf7f373e20a014e5f5e260e8b34.svg" />
        <h6>{signed}</h6>
      </div>
    </div>
  );
};

export default Header;

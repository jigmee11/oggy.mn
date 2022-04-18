import axios from "axios";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { config } from "process";
import { useContext, useEffect, useState } from "react";
import Classes from "../components/classes";
import Dashboard from "../components/dashboard";
import Header from "../components/header";
import Item from "../components/item";
import { Context, itemType, Provider } from "../components/provider";
import styles from "../styles/Home.module.css";

type PageType =
  | "dashboard"
  | "classes"
  | "assignments"
  | "attendance"
  | "calendar"
  | "grades";

export interface productType{
  img:string,
  name:String,
  category:String,
  price:String
}

const Home: NextPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAll = async () =>{
      const data = await (await axios.get("https://www.api.cool-meet.xyz/allproducts")).data;
      setProducts(data);
    }
    getAll();
  }, []);
  return (
    <div className="flex-col w-full px-20 pt-5">
      <Header />
      <div className="flex flex-row w-full flex-wrap justify-center mt-10">
        {products.map((item:itemType)=><Item img={item.img} name={item.name} category={item.category} price={item.price}/>)}
      </div>
    </div>
  );
};

export default Home;

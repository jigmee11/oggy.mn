import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Dashboard: NextPage = () => {
  return (
    <div>
      <div>classes</div>
      <div>grades</div>
      <div>attendance</div>
      <div>professors</div>
    </div>
  );
};

export default Dashboard;

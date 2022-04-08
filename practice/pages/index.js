import Head from "next/head";
import Image from "next/image";
import { Divider, Header } from "semantic-ui-react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Items from "../components/Items";

export default function Home() {
  const [items, setItems] = useState([]);
  const API_URL =
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=chanel";

  async function getData() {
    const { data } = await axios.get(API_URL);
    setItems(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>HOME | 하늘</title>
      </Head>
      <Items items={items} />
    </div>
  );
}

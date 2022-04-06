import Head from "next/head";
import Image from "next/image";
import { Divider, Header } from "semantic-ui-react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HOME | 하늘</title>
      </Head>
      <Header as="h3" style={{ paddingTop: 40 }}>
        베스트 상품
      </Header>
      <Divider />
      <Header as="h3" style={{ paddingTop: 40 }}>
        신상품
      </Header>
      <Divider />
    </div>
  );
}

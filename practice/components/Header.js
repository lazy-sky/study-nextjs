import Image from "next/image";
import { Header } from "semantic-ui-react";
import Gnb from "./Gnb";

export default function MyHeader() {
  return (
    <div>
      <div style={{ display: "flex", paddingTop: 20 }}>
        <div>
          <Image src="/images/meerkat.png" alt="" width={50} height={50} />
        </div>
        <Header as="h1">하늘</Header>
      </div>
      <Gnb />
    </div>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  // console.log(router);
  const { pathname } = router;

  return (
    <nav>
      <Link href="/">
        <a style={{ color: pathname === "/" ? "red" : "blue" }}>Home</a>
      </Link>
      <Link href="/about">
        <a style={{ color: pathname === "/about" ? "red" : "blue" }}>About</a>
      </Link>
    </nav>
  );
}

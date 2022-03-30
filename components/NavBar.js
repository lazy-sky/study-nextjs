import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  // console.log(router);
  const { pathname } = router;

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a
          className={`
            ${styles.link} 
            ${pathname === "/" ? styles.active : ""}`}
        >
          Home
        </a>
      </Link>
      <Link href="/about">
        <a
          className={[
            styles.link,
            pathname === "/about" ? styles.active : "",
          ].join(" ")}
        >
          About
        </a>
      </Link>
    </nav>
  );
}

import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      {/* active라는 클래스명을 사용해도 변화가 없다. */}
      <h1 className="active">Home Page</h1>
      <style jsx>{`
         {
          /* NavBar 안에 a태그에 영향을 주지 못한다. */
        }
        a {
          color: white;
        }
      `}</style>
    </>
  );
}

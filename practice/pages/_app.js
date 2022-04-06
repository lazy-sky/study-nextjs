/*
_app.js의 역할
- 페이지 전환시 레이아웃을 유지할 수 있다.
- 페이지 전환시 상태값을 유지할 수 있다.
- componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있다.
- 추가적인 데이터를 페이지로 주입시킬 수 있다.
- 글로벌 CSS를 이곳에서 선언한다.  
*/

import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

/*
MyApp 파라미터 설명
- Component: 현재 페이지를 의미, 페이지 전환시 이 props가 변경된다.
- pageProps: 데이터 fetch 메소드를 통해 미리 가져온 초기 객체
  - 이 메소드를 사용하지 않는다면 빈 객체 전달
  - SSR과 관련
*/
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;

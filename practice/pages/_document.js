/*
https://nextjs.org/docs/advanced-features/custom-document

_document.js 파일 안에서 페이지 렌더링에 쓰이는 html, body 태그를 업데이트 할 수 있다.
이 파일은 서버에서만 렌더링되기 때문에 이벤트 핸들러는 사용할 수 없다.
*/

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

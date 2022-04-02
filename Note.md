# NextJS 공부 메모

## 시작하기

- `npx create-next-app`
- `--example` 옵션을 사용하여 예제를 이용해볼 수도 있다.

## 페이지

- `pages` 폴더의 `index` 파일로 진입
- `pages` 폴더의 파일들은 각 주소에 해당한다. e.g., `about.js` -> `localhost:3000/about`
  - 컴포넌트 명은 상관없다.
  - 반드시 `default export`로 내보내주어야 한다.

## 라우팅

페이지 간 클라이언트 측 경로 전환을 활성화하고 SPA 경험을 제공하려면 `a` 태그 대신 `Link` 컴포넌트를 사용한다.

https://nextjs.org/docs/messages/no-html-link-for-pages

### `useRouter`

앱의 함수 컴포넌트에서 router 객체 내부에 접근하려면 `userRouter` 훅을 사용할 수 있다.

```js
import { useRouter } from 'next/router'

const router = useRouter()
```

https://nextjs.org/docs/api-reference/next/router#userouter

## Style

### CSS Modules

CSS Module 사용하기

```js
className={`
  ${styles.link} 
  ${router.pathname === "/" ? styles.active : ""}
`}

className={[
  styles.link,
  pathname === "/about" ? styles.active : "",
].join(" ")}
```

### styled-jsx

많은 사람들이 사용해 온 탓인지 Next.js에는 styled-jsx가 내장되어 있다.
styled-jsx는 css가 적용된 컴포넌트에만 영향을 미치는, 즉 스코핑된 css를 제공하는 라이브러리다.

문법 e.g.,
```html
<style jsx>{`
  CSS 스타일
`}</style>
```

## App 컴포넌트

styled-jsx를 이용해서 전역 css를 적용하고 싶다면 `global` 키워드를 추가하면 된다.
하지만 이는 CRA로 작업할 땐 발생하지 않았던 문제를 야기하는데...

Next.js는 App 컴포넌트를 사용하여 페이지를 초기화한다. 이를 재정의하고 페이지 초기화를 제어할 수 있다. 이를 통해 작업들을 수행할 수 있다.

- 페이지 변경 간에 레이아웃 유지
- 페이지 탐색 시 state 유지
- `componentDidCatch`를 사용한 커스텀 에러 처리
- 페이지에 추가 데이터 삽입
- Global CSS 추가

기본 App을 재정의하려면 `./pages/_app.js` 파일을 만들면 된다.

```js
export default function App({ Component, pageProps }) {
  return < Component {...pageProps} />
}
```

https://nextjs.org/docs/advanced-features/custom-app

### Custom App with Typescript

 `_app.tsx` 파일을 만들고 아래와 같이 작성

```tsx
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return < Component {...pageProps} />
}
```

https://nextjs.org/docs/basic-features/typescript#custom-app

+ 파일명.module.css 파일 형태를 제외한 모든 나머지 css파일들은 _app.js에서만 import해와서 사용해야 한다. 
(글로벌 css간의 충돌을 피하기 위해서이다.)

https://nextjs.org/docs/messages/css-global

## Layouts

잘 만들어진 컴포넌트는 여러 페이지에서 재사용될 수 있다. 예를 들어 모든 페이지에 동일한 navigation과 footer가 있을 수 있다.

```js
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

앱 전체에 하나의 레이아웃만 존재한다면, 커스텀 App을 만들고 레이아웃으로 감쌀 수 있다.

```js
// pages/_app.js

import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

레이아웃이 여러 개라면, `getLayout` 프로퍼티를 추가하여 페이지 단위로 레이아웃을 정의할 수 있다. 중첩 레이아웃도 가능하다.

```js
// pages/index.js

import Layout from '../components/layout'
import NestedLayout from '../components/nested-layout'

export default function Page() {
  return {
    /** Your content */
  }
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

// pages/_app.js

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
```

https://nextjs.org/docs/basic-features/layouts

### Head (next/head)

페이지에 `head` 엘리먼트를 추가하기 위해 내장 컴포넌트 `Head`를 이용할 수 있다.

`head`에 태그가 중복되지 않도록 하기 위해 태그가 한 번만 렌더링되도록 하는 `key` 속성을 사용할 수 있다.
아래 코드에서 두 번째 `meta property="og:title"`만 렌더링됩니다. 중복 `key` 속성이 있는 메타 태그는 자동으로 처리됩니다.

```js
import Head from 'next/head'

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}
```

https://nextjs.org/docs/api-reference/next/head

## next.config.js

### Redirects
`next.config.js`에서 `redirects`를 사용하면 들어오는 요청 경로를 다른 경로로 리다이렉트할 수 있다. 

`redirects`는 `source`, `destination`, `permanent` 속성이 있는 객체를 포함하는 배열을 반환하는 비동기 함수다.

- `source`: 들어오는 요청 경로 패턴
- `destination`: 라우팅하려는 경로 (리다이렉트할 경로)
- `permanent`: 
  - `true`인 경우 클라이언트와 검색 엔진에 리디렉션을 영구히 캐싱하도록 하는 308 status code를 사용하고, 
  - `false`인 경우 임시로 캐싱되지 않은 307 status code를 사용한다.

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:path*',
        destination: '/blog/:path*',
        permanent: false
      },
    ]
  },
}
```

https://nextjs.org/docs/api-reference/next.config.js/redirects

### Rewrites (URL변경되지 않음)
`next.config.js`에서 `rewrites`를 사용하면 들어오는 요청 경로를 다른 경로에 매핑할 수 있습니다.

`rewrites`는 URL 프록시 역할을 하고 `destination` 경로를 마스킹하여 사용자가 사이트에서 위치를 변경하지 않은 것처럼 보이게 한다. 
  - 이와 달리 `redirects`는 새 페이지로 reroute되고 URL 변경 사항을 표시한다.

https://nextjs.org/docs/api-reference/next.config.js/rewrites

## SSR

### `getServerSideProps`

page에서 SSR 함수인 `getServerSideProps` 함수를 `export`하는 경우 Next.js는 `getServerSideProps`에서 반환된 데이터를 사용하여 각 요청에서 이 페이지를 pre-render 한다. `getServerSideProps`는 서버 측에서만 실행되며 브라우저에서는 실행되지 않는다.

다음 예는 요청시 데이터를 fetch하고 결과를 pre-render하는 방법을 보여준다.

```js
export default function Page({ data }) {
  // Render data...
}

// 매 요청마다 실행된다.
export async function getServerSideProps() {
  // 외부 API로부터 데이터 fetch
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // props를 통해 page에 data전달
  return { props: { data } }
}
```

https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props

### `getServerSideProps` with Typesciprt

https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-with-typescript

### 언제 `getServerSideProps`를 사용해야 하는가

요청 시에 반드시 데이터를 가져와야 하는 페이지를 pre-render해야 하는 경우에만 getServerSideProps를 사용해야 한다.
데이터를 pre-render할 필요가 없다면 클라이언트에서 데이터를 가져오도록 하는 것이 나을 수 있다.

클라이언트 측에서 데이터 가져오는 과정 (Fetching data on the client side)

페이지에 자주 업데이트되는 데이터가 포함되어 있고 데이터를 pre-render할 필요가 없는 경우 클라이언트 측에서 데이터를 가져올 수 있다.

1. 먼저 데이터가 없는 페이지를 즉시 표시한다.
2. 페이지의 일부는 Static Generation을 사용해 pre-render할 수 있다.
3. 없는 데이터를 위해 로딩 상태를 표시할 수 있다.
4. 그런 다음 클라이언트에서 데이터를 가져와 준비가 되면 표시한다.

이 접근 방식은 사용자 대시보드 페이지에 적합하다. 왜냐하면 대시보드는 사용자별 개인적인 페이지이기 때문에 SEO와는 관련이 없으며 페이지를 미리 렌더링할 필요도 없기 때문이다. 또한 데이터가 자주 업데이트되므로 요청 시에 데이터를 가져오는 것이 더 적합하다.

### `getServerSideProps`가 오류 페이지를 렌더링하는가

`getServerSideProps` 내부에서 오류가 발생하면 `pages/500.js` 파일이 표시된다.

500 page(서버 렌더링 오류 페이지)는 사용자가 커스터마이징 할 수 있다. 개발 중에는 이 파일이 사용되지 않고 대신 개발 오버레이가 표시된다.
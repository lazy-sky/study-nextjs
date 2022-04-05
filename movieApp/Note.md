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

### a tag in Link

`Link` 컴포넌트 안에 `a` 태그를 넣는 이유: NextJS에서 권장하는 사용방식이다. `a` 태그를 넣지 않고, 문자열을 넣어도 아래와 같이 자동으로 NextJS가 해당 문자열을 `a` 태그로 다시 감싸주지만 그래도 NextJS에서는 `Link` 컴포넌트 안에 `a` 태그를 넣어서 사용할 것을 권장하는 것 같다. 그 이유는 `Link` 컴포넌트는 순수 html태그가 아니기 때문에 리액트 없이는 사용할 수 없지만 `a` 태그는 자바스크립트를 활성화하지 않아도 작동하기 때문에 SEO에 더 유리하기 떄문이다.

```js
if (typeof children === 'string') {
  children = <a>{children}</a>
}
```

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

```ts
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
// ...
}

function Page({ data }: InferGetServerSidePropsType< typeof getServerSideProps>)
```

```ts
type MovieDetailParams = [string, string] | [];

const router: NextRouter = useRouter();
const [title, id] = (router.query.params || []) as MovieDetailParams;
```

https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-with-typescript

### `getServerSideProps` (Context parameter)

- `params`: 이 페이지에서 동적 경로를 사용하는 경우 `params`에 route parameter가 포함된다. 
  - e.g., 페이지 이름이 `[id].js`이면 `params`는 `{ id: ... }`
- `query`: 쿼리 문자열을 나타내는 객체

https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter

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

## Dynamic Routes

Next.js에서는 `pages` 폴더에 `[param].js`와 같은 작명의 파일을 추가하여 Dynamic Route를 생성할 수 있다.

`/movies/1`, `/movies/abc` 등과 같은 모든 경로는 `pages/movies/[id].js`와 일치한다.

```js
const router = useRouter()
const { id } = router.query
```

`pages/movies/index.js`는 경로 `/movies`에 대응된다.

https://nextjs.org/docs/routing/dynamic-routes

### Catch all routes

대괄호 안에 세 개의 점(`...`)을 추가하여 모든 경로를 포착하도록 Dynamic Routes를 확장할 수 있다. 

`pages/movies/[...id].js`는 `/movies/1`은 물론 `/movies/1/2`, `/movies/1/ab/cd` 등과도 일치한다. 
일치하는 매개변수는 페이지에 쿼리 매개변수로 전송되며 항상 배열이므로 /movies/a 경로에는 다음 쿼리 객체가 있다.

e.g., `{ "id": ["a"] }`

### Optional catch all routes

대괄호를 두 번 사용하는 것으로 옵셔널 catch all routes를 만들수 있다. (e.g., `[[...id]]`)

일반 catch all과의 가장 핵심적인 차이는 옵셔널에서는 파라미터가 없는 라우트도 매칭된다는 것이다.

### 주의사항(매칭 경로 우선순위)

- 사전에 정의된 경로는 동적 경로보다 우선하며, 동적 경로는 catch all 경로에 우선한다.

  e.g.,
  - `pages/post/create.js`는 경로 `/post/create`와 매칭된다.
  - `pages/post/[id].js`는 `/post/1`, `/post/abc`등과는 매칭되지만 `/post/create`와는 매칭되지 않는다.
  - `pages/post/[...id].js`는 `/post/1/2`, `/post/a/b/c`, 등과는 매칭되지만 `/post/create`, `/post/abc`등과는 매칭되지 않는다.

## Router

### router.push

클라이언트에서의 전환을 처리한다. `next/link`로 충분하지 않을 때 유용하다.

`router.push(url, as, options)`

- `url`: `UrlObject | String`: 탐색할 URL
- `as`: `UrlObject | String`: 브라우저 URL 표시줄에 표시될 경로에 대한 옵셔널 데코레이터
- `options`: 옵셔널 설정 객체 (`scroll`, `shallow`, `getStaticProps`, `getServerSideProps` `getInitialProps`, `locale`)

```js
router.push({
  pathname: '/post/[pid]',
  query: { pid: post.id },
})
```

한편 외부 URL에 대해서는 `router.push()`를 사용할 필요가 없다.
`window.location`을 사용하는 것이 더 적합하다.

https://nextjs.org/docs/api-reference/next/router#routerpush

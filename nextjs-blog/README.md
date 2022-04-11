This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# 공식 문서 따라해보기 

# Navigate Between Pages

### Summary

- Next.js는 코드스플리팅, 클라이언트 사이드 네비게이션, 사전 페칭을 통해 자동적으로 앱을 최적화한다.
- `pages` 폴더에 파일을 만드는 것과 `Link` 컴포넌트를 사용하는 것으로 라우트를 생성할 수 있다. 다른 라우팅 라이브러리는 필요 없다.
  - [`next/link`](https://nextjs.org/docs/api-reference/next/link)
  - [`라우팅 문서`](https://nextjs.org/docs/routing/introduction)
  - 외부 페이지로 이동하고 싶을 땐 `Link` 컴포넌트 없이 `a` 태그를 사용하면 된다.
  - 새로운 `className`과 같은 attributes를 추가하고 싶다면 `Link` 컴포넌트가 아니라 `a` 태그에 추가한다.
    - e.g., 
      ```js
      return (
        <Link href="/">
          <a className="foo" target="_blank" rel="noopener noreferrer">
            Hello World
          </a>
        </Link>
      )
      ```

# Assets, Metadata, and CSS

## Assets

#### Image Component and Image Optimization

`next/image`는 모던한 웹을 위한 `img` 태그의 확장판 컴포넌트다.

Next.js는 기본값으로 리사이징, 최적화, webp와 같은 모던 포맷 지원 등의 이미지 최적화를 지원한다.
그런 한편 뷰포트보다 큰 이미지지 전달은 방지한다.

### Using the Image Component

Next.js는 빌드 시간이 아니라, 온디맨드(유저 요청 시간에)로 이미지를 최적화한다. 정적 사이트 생성기와 달리 이미지를 얼마나 많이 사용하든지 빌드 시간을 증가시키지 않는 것이다.

이미지는 레이지 로딩이 기본값이다. 즉 페이지의 속도가 뷰포트 바깥의 이미지에 의해 저하되지 않는다는 것이다. 스크롤될 때 이미지도 따라 로딩된다.

이미지는 항상 구글이 검색 순위에 사용할 Core Web Vitals인 누적 레이아웃 이동(CLS, Cumulative Layout Shift)을 피할 수 있는 방식으로 렌더링된다.
  - 누적 레이아웃 이동: 페이지의 전체 수명 동안 발생하는 모든 예기치 않은 레이아웃 이동에 대해 가장 큰 레이아웃 이동 점수 버스트. 레이아웃 이동은 시각적 요소가 렌더링된 프레임에서 다음 프레임으로 위치를 변경할 때마다 발생한다. 
    - 예를 들어, 페이지에 갑자기 바뀌는 부분이 생기는 온라인 기사와 같은 페이지 콘텐츠의 예기치 않은 이동.
    - 알 수 없는 크기의 이미지나 동영상, 대체 크기보다 크거나 작게 렌더링되는 글꼴, 동적으로 크기가 조정되는 타사 광고 또는 위젯 등이 원인이 된다.
  - Core Web Vitals: Web Vitals는 웹에서 우수한 사용자 경험을 제공하는 데 필수적인 품질 신호에 대한 통합 지침을 제공하기 위한 구글의 이니셔티브다. 그 중에서도 단순화하고, 사이트에서 가장 중요한 메트릭이 Core Web Vitals다. 구성 요소로는, 
    - Largest Contentful Paint(최대 콘텐츠풀 페인트, LCP): 로딩 성능을 측정. 페이지가 처음으로 로딩된 후 2.5초 이내 LCP가 발생하면 우수.
    - First Input Delay(최초 입력 지연, FID): 상호 작용을 측정. FID가 100밀리초 이하면 우수.
    - Cumulative Layout Shift(누적 레이아웃 시프트, CLS): 시각적 안정성을 측정. 페이지에서 0.1 이하의 CLS를 유지하면 우수.

아래는 `next/image`를 사용하여 프로필 사진을 보여주는 예시이다. `height`, `width`를 원하는 렌더링 사이즈로 작성하고, 가로 세로 비율은 원본 이미지와 동일해야 한다.

## Metadata

페이지의 메타데이터를 수정하고 싶다면 `next/head` 모듈의 `Head` 컴포넌트를 사용하면 된다. 
- [`next/head`](https://nextjs.org/docs/api-reference/next/head)

`html` 태그를 커스터마이징하고 싶다면 `pages/_document.js` 파일을 만들면 된다.
- [`Documnemt`](https://nextjs.org/docs/advanced-features/custom-document)

## Third-Party Javascript

일반적인 `script` 태그를 이용해 불러온 써드파티 자바스크립트 코드는 언제 로딩되는지가 불분명하다. 또한 특정 스크립트가 렌더링을 막고 페이지 콘텐츠 로딩을 지연시킬 수 있는 경우엔 성능을 크게 떨어뜨릴 수 있다.

### Using the Script Component

`next/script`는 `script` 태그의 확장판이다. 스크립트를 불러오거나 실행시키는 걸 최적화한다.

`Script` 컴포넌트에는 몇 가지 추가 속성이 있다.
- `strategy`: 써드파티 스크립트가 로드되는 시기를 제어한다.
  - 값 `lazyOnload`는 브라우저가 유휴 시간 동안 스크립트를 레이지하게 로드하도록 한다.
- `onLoad`: 스크립트가 로드된 후 즉시 자바스크립트 코드를 실행하는데 사용된다. 예시(`pages/posts/first-post.js`)에선 스크립트가 올바르게 로드되었음을 알리는 메시지를 띄운다.

## CSS Styling

Next.js에서는 빌트인 라이브러리인 styled-jsx를 비롯하여 styled-componenets, emotion 등의 CSS in JS 라이브러리를 사용할 수 있다.

`.css`, `.scss` 파일을 `import` 하는 방식으로도 스타일링을 할 수 있다. Tailwind와 같은 라이브러리도 이용할 수 있다.

## Layout Component

### Adding CSS

`.module.css`와 같은 파일 작명으로 CSS Modules를 사용할 수 있다.

## Global Styles

어떤 CSS 파일이 모든 페이지 적용되도록 하려면 `page/_app.js`를 작성해야 한다.

이 안에서 작성된 `App` 컴포넌트는 모든 페이지에 공통적으로 사용되는 최상위 컴포넌트다. global한 스타일을 적용하는 것 외에도 페이지를 이동하는 동안에도 상태를 유지시키는 등 최상위 컴포넌트를 이용할 수 있다.

## Styling Tips

### Using `classnames` libarary to toggle classes

`classnames`는 클래스명을 쉽게 전환할 수 있는 간단한 라이브러리다. (`npm i classnames`) 간단한 사용법은 다음과 같다.
- 예를 들어, `type` 값으로 `success` 혹은 `error`를 갖는 알림창(`Alert`)을 만들 때,
  ```js
  import styles from './alert.module.css'
  import cn from 'classnames'

  export default function Alert({ children, type }) {
    return (
      <div
        className={cn({
          [styles.success]: type === 'success',
          [styles.error]: type === 'error'
        })}
      >
        {children}
      </div>
    )
  }
  ```

### Customizing PostCSS Config

Next.js는 별도의 구성없이 PostCSS를 이용해 CSS를 컴파일할 수 있다.

PostCSS 설정 커스터마이징을 위해 루트 폴더에 `postcss.config.js`를 생성한다. 이는 Tailwind와 같은 라이브러리 이용에 유용하다.
(`npm install -D tailwindcss autoprefixer postcss`)
- [Customizing PostCSS Config](https://nextjs.org/docs/advanced-features/customizing-postcss-config)

한편 `tailwind.config.js`를 생성해 `content` 옵션을 명시하는 것이 권장된다.
- [configuring content sources](https://tailwindcss.com/docs/content-configuration)
- [Next.js + Tailwind example](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss)

### Using Sass 

Next.js를 사용하면 `.sass`, `.scss`는 물론 컴포넌트 레벨의 `.module.scss`도 사용 가능하다. 

빌트인 지원 기능을 사용하기 전에 sass를 설치하자. `npm install -D sass`

# Pre-rendering and Data Fetching

## Pre-rendering

기본적으로 Next.js는 모든 페이지를 사전 렌더링한다. 즉 클라이언트 사이드에서 작업하는 대신 모든 페이지에 대한 HTML 문서를 미리 만들어 놓는다는 것이다. 이러한 사전 렌더링은 성능과 검색 최적화에 유리하다. 

생성된 각 HTML은 해당 페이지에 필요한 최소한의 자바스크립트 코드와 연결된다. 브라우저에 의해 페이지가 로드되면 자바스크립트 코드가 실행되어 페이지를 완전히 인터랙티브하게 만든다. (이 과정을 hydration이라 한다.) 순수한 리액트 앱에는 사전 렌더링이 없다. 

## Two Forms of Pre-rendering

사전 렌더링엔 두 가지 형태가 있다.
- `Static Generation`은 빌드 시간에 HTML을 만드는 사전 렌더링 방법이다. 사전 생성된 HTML은 매 요청마다 재사용된다.
- `Server-side Rendering`은 매 요청마다 HTML을 생성하는 사전 렌더링 방법이다.

Next.js를 이용하여 각 페이지마다 원하는 사전 렌더링 방식을 선택할 수 있다. 둘을 혼합시킬 수도 있다. 대부분은 Static Generation으로 생성된다.

### When to Use Static Generation vs. Server-side Rendering

가능하다면 Static Generation이 권장된다. 왜냐하면 CDN에 의해 먼저 페이지가 빌드되고 이는 요청에 의한 렌더링방식보다 훨씬 빠르기 때문이다. 마케팅 페이지, 블로그 포스트, 이커머스 상품 리스트, 도움말 및 문서 등이 좋은 용례이다.

유저가 요청하기 이전에 이 페이지를 사전에 렌더링할 수 있다면 Static Generation을 선택하는 것이 옳다.

반면에 유저가 요청하기 전에 페이지를 사전에 렌더링할 수 없다면 서버사이드 렌더링을 선택하는 것이 옳다. 빈번하게 갱신되는 데이터를 담고 있거나 매 요청마다 페이지 콘텐츠가 자주 바뀌는 페이지가 이에 해당한다. 혹은 사전 렌더링을 하지 않고 클라이언트 측 자바스크립트를 사용하여 자주 업데이트되는 데이터를 처리할 수도 있다.

## Static Generation with and without Data

데이터가 없는 경우는 물론 HTML을 렌더링하기 위해 빌드 시간에 외부 API나 데이터베이스 등에 접근해야 하는 경우에도 Static Generation을 이용할 수 있다.
- [Static Generation with data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data)

### Static Generation with Data using `getStaticProps`

페이지 컴포넌트를 `export`하면서 동시에 비동기 함수 `getStaticProps`를 `export` 하는 것으로 가능하다.
- [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

`getStaticProps`는 빌드 시간에 실행된다. 함수 안에서 외부 데이터를 불러오고 그 데이터를 페이지에 `props`로 전달할 수 있다.

e.g.,
```js
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

## getStaticProps Details

`getStaticProps`를 이용해 `lib/posts.js`에서 내부 파일 시스템을 이용해서 데이터를 불러오는 것 이외에도 API 등을 이용하여 외부 데이터를 불러오거나 데이터베이스에 직접 쿼리하는 것도 가능하다. 왜냐하면 `getStaticProps`는 서버 측에서만 실행되기 때문이다. 클라이언트 측에서는 절대로 실행되지 않는다.

개발 모드에선 매 요청(`npm run dev`)마다 `getStaticProps`가 실행된다. 배포 모드에선 빌드 시간에 실행된다.

`getStaticProps`는 `page` 내에서만 사용할 수 있다. 다른 컴포넌트 파일에선 `export` 할 수 없다. 

만약 요청 시에 데이터를 불러와야 한다면 Static Generation은 좋은 옵션이 아니다. 이 경우엔 Server-side Rendering을 채택하거나 사전 렌더링을 건너 뛰어야 한다.

## Fetching Data at Request Time

서버 사이드 렌더링을 하기 위해선 `getStaticProps` 대신에 `getServerSideProps`를 `export`해야 한다.

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

`getServerSideProps`는 요청 시간에 호출되기 때문에 이 함수의 파라미터 `context`에는 요청과 관련된 파라미터들이 포함되어 있다. 

`getServerSideProps`는 요청 시간에 불러와야 하는 데이터를 가진 페이지를 사전 렌더링할 때만 사용해야 한다. 왜냐하면 서버가 모든 요청에 대해 결과를 계산해야 하고 추가 설정없이는 CDN에 의해 결과를 캐시할 수 없기 때문에 `getStaticProps`보다 TTFB(Time to first byte)가 느리기 때문이다.

만약 사전 렌더링을 할 필요가 없다면 Client-side Rendering을 고려할 수 있다.
- [Client side](https://nextjs.org/docs/basic-features/data-fetching/client-side)

먼저 외부 데이터가 필요 없는 페이지 부분을 정적으로 생성(사전 렌더링)한다. 그리고 페이지가 로드되면 자바스크립트를 사용하여 클라이언트에서 외부 데이터를 가져오고 나머지 부분을 채우는 식이다. 이러한 방식은 유저 대시보드 페이지 구현 등에 유용하다. (왜냐하면 대시보드는 사용자별 전용 페이지이므로 SEO와는 관련이 없으며 페이지를 미리 렌더링할 필요가 없기 때문이다. 그리고 데이터가 자주 업데이트되므로 요청 시 데이터를 가져와야 한다.)

클라이언트 측에서 데이터를 가져오는 경우 SWR을 이용할 수 있다. SWR은 caching, revalidation, focus tracking, refetching on interval 등을 다룬다.
- [SWR](https://swr.vercel.app/ko)

# Dynamic Routes

## Page Path Depends on External Data

### Overview

`pages/posts` 폴더 안에 `[id].js` 파일을 만들고, 다른 페이지 파일처럼 코드를 작성한다.

그리고 이 페이지에서 비동기 함수 `getStaticPaths`를 `export`한다. 이 함수는 파일명의 `id`가 될 수 있는 값들의 리스트를 리턴해야 한다.

마지막으로 `getStaticProps`를 다시 구현한다. 주어진 `id`로 필요한 데이터를 가져온다. `getStaticProps`에는 `id`가 포함된 파라미터가 주어진다.

```js
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

## Implement getStaticPaths

- [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)
- [getStaticPaths API reference](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths)

동적 경로를 갖고 있고 `getStaticProps`를 사용하는 페이지는 정적으로 생성돼야 하는 경로의 리스틀 정의해줘야 한다.

동적 영로를 사용하는 페이지에서 `getStaticPaths`를 `export`하면 Next.js는 `getStaticPaths`에 의해 명시된 모든 경로를 정적으로 사전 렌더링한다.

`getstaticPaths`는 반드시 `getStaticProps`와 함께 쓰여야 한다. `getServerSideProps`와는 함께 사용할 수 없다.

```js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } }
    ],
    fallback: true // false or 'blocking'
  };
}
```

`getStaticPaths`가 반환하는 값들
- `paths`: 사전 렌더링될 경로들
- `fallback`
  - `false`: `getStaticPaths`에서 리턴하지 않는 경로는 404 페이지로 처리한다.
  - `true`
    - 마찬가지로 `getStaticPaths`가 리턴하는 경로를 빌드 시간에 사전 렌더링한다.
    - 리턴하지 않는 경로를 404 페이지로 처리하지 않는 대신 Next.js가 제공하는 fallback 페이지로 처리한다.
    - 완료되면 브라우저는 생성된 경로에 대한 JSON을 받는다. 이는 필요한 props로 페이지를 자동으로 렌더링하는데 필요하다. 유저 관점에서 볼 때 페이지는 fallback 페이지에서 전체 페이지로 변경된다. 이와 동시에 Next.js는 이 경로를 사전 렌더링될 리스트에 추가한다.
    - `true` 옵션은 데이터에 의존하는 정적 페이지 수가 매우 많은 경우에 유용하다. 이를테면 큰 규모의 이커머스 사이트 경우에 모든 제품 페이지를 미리 렌더링하려면 빌드 시간이 매우 오래 걸릴 것이다. 그 대신 작은 페이지 부분 집합을 정적으로 생성하고 나머지 부분에는 `true` 옵션을 적용해두면 유저는 아직 생성되지 않는 페이지를 요청할 때 로딩 표시와 스켈레톤 컴포넌트(fallback 페이지)를 볼 수 있다. 이후 `getStaticProps`가 완료되면 요청된 데이터로 페이지가 렌더링된다. 이제부터 동일한 페이지를 요청하는 모든 사용자는 사전 렌더링된 페이지를 볼 수 있다. 이를 통해 빠른 UX와 빠른 빌드를 동시에 챙길 수 있다. 
    - 한편 `true`는 생성된 페이지들을 갱신하지 않는다. 이를 위해선 [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)이 필요하다.
  - `'block'`: `getStaticPaths`가 리턴하지 않는 경로에 대해 HTML이 생성되는 것을 기다린다. (SSR과 동일) 그리고 미래에 있을 요청을 위해 캐싱된다. 그래서 이는 각 경로마다 한 번만 발생한다.
 - Fallback pages
  - 대체 버전의 페이지다.
  - 라우터를 사용하여 fallback이 렌더링되는지 탐지할 수 있다. (`router.isFallback` will be `true`).
  - e.g.,
    ```js
    // pages/posts/[id].js
    import { useRouter } from 'next/router'

    function Post({ post }) {
      const router = useRouter()

      // If the page is not yet generated, this will be displayed
      // initially until getStaticProps() finishes running
      if (router.isFallback) {
        return <div>Loading...</div>
      }

      // Render post...
    }

    // This function gets called at build time
    export async function getStaticPaths() {
      return {
        // Only `/posts/1` and `/posts/2` are generated at build time
        paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
        // Enable statically generating additional pages
        // For example: `/posts/3`
        fallback: true,
      }
    }

    // This also gets called at build time
    export async function getStaticProps({ params }) {
      // params contains the post `id`.
      // If the route is like /posts/1, then params.id is 1
      const res = await fetch(`https://.../posts/${params.id}`)
      const post = await res.json()

      // Pass post data to the page via props
      return {
        props: { post },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
      }
    }

    export default Post
    ```

`getstaticPaths`를 써야하는 경우
- 동적 경로와 함께 정적으로 사전 렌더링해야 할 때
- 데이터가 
  - headless CMS에서 올 때
  - 데이터베이스에서 올 때
  - 파일시스템에서 올 때
- SEO를 위해 페이지가 반드시 사전 렌더링되어야 하고 빨라야 할 때 

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

This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# 공식 문서 따라해보기 

## Navigate Between Pages

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
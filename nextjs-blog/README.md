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

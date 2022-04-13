# next-seo-starter

This repository contains the starter template for the [Improving Web Vitals](https://nextjs.org/learn/seo/improve/lighthouse) example of the Next.js [learn SEO course](https://nextjs.org/learn/seo/introduction-to-seo).

## Image Optimization

일반적인 HTML을 사용하면 아래와 같이 히어로 이미지를 추가한다.

```html
<img src="large-image.jpg" alt="Large Image" />
```

그러나 이는 몇 가지 사항을 수동으로 최적화해야 함을 의미한다.

- 이미지가 다양한 화면 크기로 반응하도록 보장해야 한다.
- 써드 파티 또는 라이브러리를 사용하여 이미지 최적화해야 한다.
- 뷰포트에 들어갈 때 이미지가 레이지 로딩되도록 해야 한다.

### The `Image` Component

Next는 이러한 최적화를 즉시 처리할 수 있는 `Image` 컴포넌트를 제공한다.

`next/image`는 모던 웹을 위해 진화한 `img` 태그의 확장판이다. 

`Image`는 webp와 같은 최신 포맷 지원, 크기 조정, 최적화 등을 자동으로 수행한다. 

### How does Automatic Image Optimization Work?

- 온디맨드 최적화: 빌드 시 이미지를 최적화하는 대신 Next.js는 사용자가 요청할 때 필요에 따라 이미지를 최적화한다. 
- 레이지 로딩된 이미지: 뷰포트 외부에 저장된 이미지에 대해 페이지 속도가 저하되지 않는다. 이미지가 화면에 나타날 때만 로드됩니다.
- CLS 회피: 이미지는 항상 누적 레이아웃 이동(CLS)을 방지하며 렌더링된다.

### Using the `Image` Component

`width`, `height`는 소스 이미지와 동일한 가로 세로 비율을 가진 원하는 렌더링 크기여야 한다.

```js
// Before
<img src="large-image.jpg" alt="Large Image" />

// After
<Image src="/large-image.jpg" alt="Large Image" width={3048} height={2024} />
```
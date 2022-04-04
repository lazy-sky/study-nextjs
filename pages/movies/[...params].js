import { useRouter } from "next/router";

import Seo from "../../components/Seo";

export default function Detail({ data, title }) {
  const { genres, overview, release_date, runtime, vote_average } = data;

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
      <div>개봉일: {release_date}</div>
      <div>장르: {genres[0].name}</div>
      <div>상영 시간: {runtime}분</div>
      <div>평점: {vote_average}</div>
      <div>줄거리: {overview}</div>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }) {
  const [title, id] = params || [];

  const data = await (
    await fetch(`http://localhost:3000/api/movie/${id}`)
  ).json();

  return {
    props: {
      data,
      title,
    },
  };
}

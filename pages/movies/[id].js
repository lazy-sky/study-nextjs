import { useRouter } from "next/router";

export default function Detail({ data }) {
  const router = useRouter();
  const { genres, overview, release_date, runtime, vote_average } = data;

  return (
    <div>
      <h4>{router.query.title || "Loading..."}</h4>
      <div>개봉일: {release_date}</div>
      <div>장르: {genres[0].name}</div>
      <div>상영 시간: {runtime}분</div>
      <div>평점: {vote_average}</div>
      <div>줄거리: {overview}</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { id },
  } = context;

  const data = await (
    await fetch(`http://localhost:3000/api/movie/${id}`)
  ).json();

  return {
    props: {
      data,
    },
  };
}

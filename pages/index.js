import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import SEO from "../components/SEO";

export default function Home({ results }) {
  const router = useRouter();

  const handleClickMovie = (id, title) => {
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      // url 마스킹
      `/movies/${id}`
    );
  };

  return (
    <div className="container">
      <SEO title="Home" />
      {results?.map((movie) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <a>
            <div
              className="movie"
              onClick={() => handleClickMovie(movie.id, movie.original_title)}
            >
              <div className="movie-poster">
                <Image
                  src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
              <h4>{movie.original_title}</h4>
            </div>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }

        .movie {
          cursor: pointer;
        }

        .movie .movie-poster {
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        .movie:hover .movie-poster {
          transform: scale(1.05) translateY(-10px);
        }

        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch("http://localhost:3000/api/movies")
  ).json();

  return {
    props: {
      results,
    },
  };
}

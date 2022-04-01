import { useState, useEffect } from "react";

import Image from "next/image";

import SEO from "../components/SEO";

export default function Home({ results }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();

      setMovies(results);
    })();
  }, []);

  return (
    <div className="container">
      <SEO title="Home" />
      {movies?.map((movie) => (
        <div className="movie" key={movie.id}>
          <div className="movie-poster">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
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

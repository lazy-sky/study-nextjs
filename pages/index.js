import { useState, useEffect } from "react";

import SEO from "../components/SEO";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "4093b02ed35488e6a2169b31dd594816";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(`${BASE_URL}/popular?api_key=${API_KEY}`)
      ).json();

      setMovies(results);
    })();
  }, []);

  return (
    <>
      <SEO title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </>
  );
}

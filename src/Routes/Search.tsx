import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getMovie } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components"; // styled-components 임포트
import { motion, AnimatePresence } from "framer-motion";
import MovieModal from "../Components/MovieModal";

const SearchContainer = styled.div`
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-bottom: 100px;
`;

const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const MovieBox = styled(motion.div)`
  background-color: white;
  background-size: cover;
  background-position: center center;
  width: 300px;
  height: 400px;
  font-size: 66px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const MovieImage = styled.img`
  max-width: 100%;
`;
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.3,
      duaration: 0.9,
      type: "tween",
    },
  },
};

function Search() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const { data, isLoading } = useQuery({
    queryKey: ["movie", keyword],
    queryFn: () => getMovie(keyword),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  // 클릭 함수 핸들러
  const onBoxClicked = (movieId: number) => {
    navigate(`/detail/${movieId}`);
  };
  return (
    <SearchContainer>
      <h3>
        {keyword} 으로 검색한 결과 {data?.total_results}개
      </h3>
      <AnimatePresence initial={false}>
        <MoviesGrid>
          {data?.results.map((movie: any) => (
            <MovieBox
              layoutId={movie.id + ""}
              whileHover="hover"
              initial="normal"
              key={movie.id}
              onClick={() => onBoxClicked(movie.id)}
              variants={boxVariants}
            >
              <MovieImage
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </MovieBox>
          ))}
        </MoviesGrid>
      </AnimatePresence>
      <MovieModal data={data?.results || []} />
    </SearchContainer>
  );
}

export default Search;

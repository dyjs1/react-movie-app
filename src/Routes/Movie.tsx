import { useQuery } from "react-query";
import { IGetMoviesResult } from "./Home";
import { getMovies } from "../api";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";

const Movie = () => {
  // 영화 데이터 가져오기
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });

  return (
    <Container>
      <GridContainer>
        {data?.results?.map((movie, index) => (
          <>
            <GridItem key={index}>
              {" "}
              {/* key 추가 */}
              <img
                src={makeImagePath(movie?.backdrop_path || "")}
                alt={movie?.title}
              />
            </GridItem>
          </>
        ))}
      </GridContainer>
    </Container>
  );
};

export default Movie;

const Container = styled.div`
  position: relative;
  color: #fff;
  background-color: #000;
  min-height: 100vh;
  margin-top: 100px;
  margin-left: 100px;
  margin-right: 100px;

  display: flex;
  justify-content: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
`;

const GridItem = styled.div`
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

import { useQuery } from "react-query";
import { getMovieDetail } from "../api";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface IGenre {
  id: number;
  name: string;
}

interface IProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | any;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function Detail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery<IMovie>({
    queryKey: ["detail", id],
    queryFn: () => getMovieDetail(Number(id)),
  });

  if (isLoading) return <Loading>Loading...</Loading>;

  if (!data) return <NoData>No data found.</NoData>;

  return (
    <Container>
      <Background>
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
          alt={data.title}
        />
      </Background>
      <Content>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
        />
        <Details>
          <Title>{data.title}</Title>
          <Tagline>{data.tagline}</Tagline>
          <Overview>{data.overview}</Overview>
          <ReleaseDate>Release Date: {data.release_date}</ReleaseDate>
          <Genres>
            Genres: {data.genres.map((genre) => genre.name).join(", ")}
          </Genres>
          <VoteAverage>Rating: {data.vote_average}/10</VoteAverage>
        </Details>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  color: #fff;
  background-color: #000;
  min-height: 100vh;
  margin-top: 100px;
  margin-left: 100px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5);
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Details = styled.div`
  margin-left: 20px;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 10px;
`;

const Tagline = styled.p`
  font-style: italic;
  color: #ff3d00;
  margin: 0 0 15px;
`;

const Overview = styled.p`
  margin-bottom: 15px;
`;

const ReleaseDate = styled.p`
  margin: 5px 0;
`;

const Genres = styled.p`
  margin: 5px 0;
`;

const VoteAverage = styled.p`
  margin: 5px 0;
`;

const Loading = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 50px;
`;

const NoData = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 50px;
`;

export default Detail;

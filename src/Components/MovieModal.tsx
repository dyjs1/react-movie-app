// MovieModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { IMovie } from '../Routes/Home';

interface MovieModalProps {
  data: IMovie[];
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const Container = styled.div`
  padding: 20px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -80px;
`;

const MovieModal = ({ data }: MovieModalProps) => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch('/movies/:movieId');

  const onOverlayClick = () => {
    console.log('onOverlayClick');
    navigate('/');
  };

  const onMovieClick = (movieId: string) => {
    console.log(';;;');
    navigate(`/movies/${movieId}`);
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.find((movie) => movie.id + '' === bigMovieMatch.params.movieId);

  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} />
          <BigMovie layoutId={bigMovieMatch.params.movieId}>
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      'w500'
                    )})`,
                  }}
                />
                <img
                  src={makeImagePath(clickedMovie.poster_path, 'w500')}
                  style={{
                    position: 'absolute',
                    width: '250px',
                    top: '50%',
                    left: '15px',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                  }}
                />
                <Container>{clickedMovie.release_date}</Container>
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.overview}</BigOverview>
                <Container>Rating: {clickedMovie.vote_average}</Container>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default MovieModal;

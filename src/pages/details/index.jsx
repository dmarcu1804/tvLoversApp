import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Layout } from '../layout';
import { Container, Grid, Item } from '../../components/Grid';
import { getCast, getShowDetails } from '../../api';
import { FiChevronLeft } from 'react-icons/fi';
import { FaImdb } from 'react-icons/fa';
import { useStore } from '../../store';
import styles from './Details.module.css';
import { Tabs } from '../../components/Tabs';

export const Details = () => {
  const [seasons, setSeasons] = useState({});
  const { shows, setShows, cast, setCast, alternateShows, setAlternateShows } = useStore();
  const { id } = useParams();

  useEffect(() => {
    getShowDetails(id).then((data) => {
      setShows(data);
      setSeasons(
        Object.entries(Object.groupBy(data?._embedded.episodes, ({ season }) => season)),
      );
    });
    getCast(id).then((data) => {
      setCast(data);
    });
  }, [id]);
  console.log('cast', cast);
  return (
    <Layout>
      <Container className={'mainContent'}>
        <FiChevronLeft
          onClick={() => window.history.back()}
          className={styles.backButton}
        />
        <Grid>
          <Item xxlSpan={3} xlSpan={4} lgSpan={4} mdSpan={4} smSpan={4}>
            <div className={styles.imageContainer}>
              <img src={shows?.image?.original} alt={shows?.name} />
            </div>
          </Item>
          <Item xxlSpan={9} xlSpan={8} lgSpan={8} mdSpan={4} smSpan={4}>
            <div className={styles.detailsContainer}>
              <div dangerouslySetInnerHTML={{ __html: shows?.summary }} />
              {shows?.averageRuntime && <p>Run time: {shows.averageRuntime}</p>}
              {shows?.genres?.length > 0 && <p>Genres: {shows.genres.join(', ')}</p>}
              {shows?.rating?.average && <p>Rating: {shows.rating.average}</p>}
              {shows?.premiered && <p>Premiered: {shows.premiered}</p>}
              {shows?.ended && <p>Ended: {shows.ended}</p>}
              {shows?.externals?.imdb && (
                <a
                  href={`https://www.imdb.com/title/${shows?.externals.imdb}/`}
                  target="_blank"
                >
                  <FaImdb className={styles.externalLinksIcon} />
                </a>
              )}
            </div>
          </Item>
        </Grid>
        {cast?.length > 0 && (
          <div className={styles.castContainer}>
            <h3>Cast</h3>
            <Grid>
              {cast.map((actor) => (
                <Item
                  key={actor.id}
                  xxlSpan={2}
                  xlSpan={2}
                  lgSpan={3}
                  mdSpan={2}
                  smSpan={4}
                >
                  <img
                    src={actor.person?.image?.medium}
                    alt={actor.person.name}
                    className={styles.actorImage}
                  />
                  <p className={styles.actorName}>
                    {actor.person.name} as {actor.character?.name}
                  </p>
                </Item>
              ))}
            </Grid>
          </div>
        )}
        {seasons?.length > 0 && (
          <>
            <h2>Episodes</h2>
            <Tabs
              tabs={seasons.map(([seasonNumber, episodes]) => ({
                id: seasonNumber,
                label: `Season ${seasonNumber}`,
                content: (
                  <Grid className={styles.episodesContainer}>
                    {episodes.map((episode) => (
                      <Item
                        key={episode.id}
                        xxlSpan={2}
                        xlSpan={2}
                        lgSpan={3}
                        mdSpan={2}
                        smSpan={2}
                        className={styles.episodeCard}
                      >
                        <img src={episode.image.medium} />
                        <h3 className={styles.episodeTitle}>
                          {episode.number}: {episode.name}
                        </h3>
                      </Item>
                    ))}
                  </Grid>
                ),
              }))}
              activeTab={'1'}
              onTabChange={() => {}}
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

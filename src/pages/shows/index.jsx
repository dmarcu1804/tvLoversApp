import { Card } from '../../components/Card';
import { Searchbar } from '../../components/Searchbar';
import { Grid, Item } from '../../components/Grid';
import { Sidebar } from '../../components/Sidebar';
import { Layout } from '../layout';
import { useStore } from '../../store';
import { useEffect, useState } from 'react';
import { getSearchedShows, getShows } from '../../api';
import { Pagination } from '../../components/Pagination';
import { filters as filterContent } from '../../content/filters';

export const Shows = () => {
  const { query, filters, shows, setShows } = useStore();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredShows, setFilteredShows] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
    setFilteredShows(shows);
    if (!query) {
      getShows().then((data) => {
        setShows(data);
      });
      return;
    }
    getSearchedShows(query).then((data) => {
      setShows(data);
    });
  }, [, query]);

  useEffect(() => {
    let result = [];
    if (filters.length === 0) return setFilteredShows(shows);
    result = shows.filter((show) => {
      return filters.every((filter) => {
        if (filter.key === 'rating') {
          return (
            show.rating?.average > parseInt(filter.value) &&
            show.rating?.average < parseInt(filter.value) + 1
          );
        }
        if (filter.key === 'premiered') {
          return show.premiered?.startsWith(filter.value);
        }
        if (filter.key === 'genre') {
          return show.genres?.includes(filter.value);
        }
        if (filter.key === 'language') {
          return show.language === filter.value;
        }
        return true;
      });
    });

    setFilteredShows(result);
  }, [shows, filters]);

  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set('page', currentPage);
    window.history.pushState({}, '', url);
  }, [currentPage]);

  return (
    <Layout>
      <Grid>
        <Item xxlSpan={2} xlSpan={2} lgSpan={2} mdSpan={2} smSpan={1}>
          <Sidebar filterContent={filterContent} />
        </Item>
        <Item xxlSpan={10} xlSpan={10} lgSpan={10} mdSpan={6} smSpan={3}>
          <div className={'mainContent'}>
            <h1>Shows</h1>
            <Searchbar />
            <p>Refined results: {filteredShows.length}</p>
            {filteredShows.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredShows.length / itemsPerPage)}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
            <Grid>
              {filteredShows
                .filter((show) => show.name.toLowerCase().includes(query.toLowerCase()))
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((card) => (
                  <Item
                    key={card.id}
                    xxlSpan={3}
                    xlSpan={4}
                    lgSpan={4}
                    mdSpan={4}
                    smSpan={4}
                  >
                    <Card {...card} />
                  </Item>
                ))}
            </Grid>
          </div>
        </Item>
      </Grid>
    </Layout>
  );
};

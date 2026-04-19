import { Card } from '../../components/Card';
import { Searchbar } from '../../components/Searchbar';
import { Grid, Item } from '../../components/Grid';
import { Layout } from '../layout';
import { useStore } from '../../store';

export const Home = () => {
  const { query, shows } = useStore();

  return (
    <Layout>
      <Grid>
        <Item xxlSpan={12} xlSpan={12} lgSpan={12} mdSpan={8} smSpan={4}>
          <div className={'mainContent'}>
            <h1>Welcome to the TV App</h1>
            <Searchbar />
            {query.length > 0 && <p>Search results for "{query}"</p>}
            <Grid>
              {shows.map((card) => (
                <Item
                  key={card.id}
                  xxlSpan={2}
                  xlSpan={2}
                  lgSpan={3}
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

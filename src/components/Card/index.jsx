import styles from './Card.module.css';

export const Card = (card) => {
  const { id, name, image, genres, rating, premiered, language } = card;
  let imageUrl =
    image != null
      ? image.medium
      : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930';

  return (
    <div className={styles.card} data-testid="card">
      <a href={`/detail/${id}`} className={styles.imageLink}>
        <img
          src={imageUrl}
          alt={name}
          className={styles.thumbnail}
          data-testid="cardImage"
        />
      </a>
      <div className={styles.cardInfo}>
        <h4 className={styles.cardTitle} data-testid="cardTitle">
          {name}
        </h4>
        <p className={styles.cardData}>Language: {language}</p>
        {genres.length > 0 && (
          <p className={styles.cardData}>Genre: {genres.join(', ')}</p>
        )}
        {rating.average != null && (
          <p className={styles.cardData}>Rating: {rating.average}</p>
        )}
        {premiered != null && <p className={styles.cardData}>Premiered: {premiered}</p>}
      </div>
    </div>
  );
};
export default Card;

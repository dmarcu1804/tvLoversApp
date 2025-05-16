import {
  individualShowDisplayed,
  showsDisplayed,
} from ".././elements.module.css";
import nullImage from ".././TVApp_Null.jpeg";
import { Link } from "react-router-dom";

const DisplayProfiles = ({ shows }) => {
  return (
    <>
      <div className={showsDisplayed}>
        {shows.map((show) => {
          const { id, name, image, genres } = show.show;
          const imageURL = image?.medium ?? "Null";
          //console.log(imageURL)
          const genreAvailable = genres.length;

          return (
            <Link key={id} to={`/shows/${id}`}>
              <div className={individualShowDisplayed}>
                <img
                  src={imageURL !== "Null" ? imageURL : nullImage}
                  alt="pic"
                />
                <h5>{name}</h5>
                {genreAvailable > 0
                  ? genres.map((genre, index) => (
                      <small key={index}>
                        {genre}
                        {index < genres.length - 1 ? ", " : ""}
                      </small>
                    ))
                  : ""}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DisplayProfiles;

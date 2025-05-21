import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import nullImageBig from '.././tvApp_null_big.jpeg'
import {
  fetchingShowDisplay, showDetailText
} from ".././elements.module.css";

const ShowDetail = () => {
  const { id } = useParams();
  const [fetchedShow, setFetchedShow] = useState(null)

  const fetchShow = async () => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/shows/${id}`
      );
      setFetchedShow(response.data)
      console.log(response.data);
    } catch (error) {
      console.error("not pulled in", error);
    }
  };

  useEffect(() => {
    fetchShow()
  }, [id])

  if (!fetchedShow) return <p>Loading…</p>; 

  const { name, genres, image, rating, premiered, summary } = fetchedShow ?? {}
  const imageURL = image?.original ?? "Null";
  const genreAvailable = genres.length;
  //console.log("showDetail id pressed", id);

  console.log(fetchedShow)
  return (
    <>
      <div className={fetchingShowDisplay}>
        <img src={imageURL !== "Null" ? imageURL : nullImageBig} alt="pic" />
        <div className={showDetailText}>
          <h1>{name}</h1>
        {genreAvailable > 0
                  ? genres.map((genre, index) => (
                      <small key={index}>
                        {genre}
                        {index < genres.length - 1 ? ", " : ""}
                      </small>
                    ))
                  : ""}
            <p>Rating : {rating.average}</p>
            {summary}
        </div>
        {/* <h1>{name}</h1> */}
        {/* {genreAvailable > 0
                  ? genres.map((genre, index) => (
                      <small key={index}>
                        {genre}
                        {index < genres.length - 1 ? ", " : ""}
                      </small>
                    ))
                  : ""}
            <p>Rating : {rating.average}</p>
            {summary} */}
        
            {/* // fetchedShow ? 
            // (<img src={imageURL !== "Null" ? imageURL : nullImageBig} alt="pic" />) :
            // (<p>Nothing</p>) */}
            
        
      </div>
    </>
  );
};

export default ShowDetail;

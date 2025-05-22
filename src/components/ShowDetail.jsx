import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import nullImageBig from '.././tvApp_null_big.jpeg'
import {
  fetchingShowDisplay, showDetailText, summaryFormat, ratingFormat, starringFormat
} from ".././elements.module.css";

const ShowDetail = () => {
  const { id } = useParams();
  const [fetchedShow, setFetchedShow] = useState(null)
  const [fetchedCast, setFetchedCast] = useState([])

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

  const fetchCast = async () => {
    try{
      const response = await axios.get(
        `https://api.tvmaze.com/shows/${id}/cast`
      );
      setFetchedCast(response.data)
      console.log(response.data);
    }catch (error) {
      console.error("not pulled in", error);
    }
  }

  useEffect(() => {
    fetchShow()
    fetchCast()
  }, [id])


  if (!fetchedShow) return <p>Loading…</p>; 

  const { name, genres, image, rating, premiered, summary } = fetchedShow ?? {}
  const imageURL = image?.original ?? "Null";
  const genreAvailable = genres.length;
  //console.log("showDetail id pressed", id);

  return (
    <>
      <div className={fetchingShowDisplay}>
        <img src={imageURL !== "Null" ? imageURL : nullImageBig} alt="pic" />
        <div className={showDetailText}>
          <h1>{name}</h1>
        {genreAvailable > 0
                  ? <small>{genres.join(", ")}</small>
                    
                  : ""}
            <p className={ratingFormat}>Rating : {rating.average}</p>
            <p className={summaryFormat}>{summary ? summary.replace(/<[^>]*>/g, '') : ""}</p>
            <p className={starringFormat}>STARRING: 
                  {fetchedCast.map(castMember => castMember.person.name).join(", ")}
            </p>
        </div>
        
            
        
      </div>
    </>
  );
};

export default ShowDetail;

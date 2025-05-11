import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from "axios";
import { topBar, mainSection, mainContent, bottomContent } from './elements.module.css'

//const axios = require('axios')

const App = () => {
  const [shows, setShows] = useState([]); //stores list of shows fetched
  const [inputValue, setInputValue] = useState(""); //stores input typed in
  const [showNameSearch, setShowNameSearch] = useState(""); //stores nameOfShowSearched

  const fetchShows = async () => {
    try {
      //console.log(showNameSearch)
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${showNameSearch}`
      );
      setShows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("not pulled in", error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [showNameSearch]); //re-renders when state changes (after button was pressed with show name)

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  //when button is clicked,
  const handleSearch = (e) => {
    e.preventDefault();
    setShowNameSearch(inputValue);
  };

  return (
    <>
      <div className={topBar}>
        <h1>TV Lovers</h1>
      </div>

      <div className={mainSection}>
        <div className="main-text">
          <h1>For the TV obsessed!!!</h1>
          <p>Find out everything about your favourite TV shows.</p>
        </div>

        <div className={mainContent}>
          <form>
            <input value={inputValue} onChange={handleInput} placeholder="enter your fave show name"/>
            <button type="submit" onClick={handleSearch}>search</button>
          </form>
        </div>
      </div>

      <div className={bottomContent}>
        <h1>Search results for ...</h1>
        <p>Please enter your fave show above and hit 'search'</p>
      </div>
    </>
  );
};

export default App;

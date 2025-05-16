import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from "axios";
import { topBar, mainSection, mainContent, bottomContent, showsDisplayed, individualShowDisplayed } from './elements.module.css'
import nullImage from './TVApp_Null.jpeg'
import DisplayProfiles from "./components/DisplayProfiles";
import Home from "./components/Home"
import { Routes, Route } from 'react-router-dom'
import ShowDetail from "./components/ShowDetail";

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

      <Routes>
            <Route path="/" element={<Home handleInput = {handleInput} handleSearch={handleSearch} inputValue={inputValue} shows = {shows} showNameSearch = {showNameSearch}/>} />
            <Route path="/shows/:id" element={<ShowDetail />} />
      </Routes>

      {/* <Home handleInput = {handleInput} handleSearch={handleSearch} inputValue={inputValue} shows = {shows} showNameSearch = {showNameSearch}/> */}
      
      {/* display shows in Grid format with 4 columns */}
      {/* <div className={showsDisplayed}>
        <DisplayProfiles shows={shows} />
      </div> */}
    </>
  );
};

export default App;

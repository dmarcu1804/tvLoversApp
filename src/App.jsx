import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios'
//const axios = require('axios')


const App = () => {
  const [shows, setShows] = useState([]) //stores list of shows fetched
  const [inputValue, setInputValue] = useState('') //stores input typed in
  const [showNameSearch, setShowNameSearch] = useState('') //stores nameOfShowSearched

  const fetchShows = async () => {
    try{
      //console.log(showNameSearch)
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${showNameSearch}`)
      setShows(response.data)
      console.log(response.data)
    }
    catch(error){
      console.error("not pulled in", error)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [showNameSearch])//re-renders when state changes (after button was pressed with show name)

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  //when button is clicked, 
  const handleSearch = (e) => {
    e.preventDefault()
    setShowNameSearch(inputValue)
  }

  return (
    <>
      <form>
        <input value={inputValue} onChange={handleInput} placeholder='Type in your favourite show'/>
        <button type="submit" onClick={handleSearch}> Search </button>
      </form>

      

    </>
  )
}

export default App

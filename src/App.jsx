// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   topBar,
//   mainSection,
//   mainContent,
//   bottomContent,
//   showsDisplayed,
//   individualShowDisplayed,
// } from "./elements.module.css";
// import Home from "../components/Home";
// import { Routes, Route, RouterProvider, createBrowserRouter } from "react-router-dom";
// import ShowDetail from "../components/ShowDetail";

// //const axios = require('axios')

// const App = () => {
//   const [shows, setShows] = useState([]); //stores list of shows fetched
//   const [inputValue, setInputValue] = useState(""); //stores input typed in
//   const [showNameSearch, setShowNameSearch] = useState(""); //stores nameOfShowSearched

//   const fetchShows = async () => {
//     try {
//       //console.log(showNameSearch)
//       const response = await axios.get(
//         `https://api.tvmaze.com/search/shows?q=${showNameSearch}`,
//       );
//       setShows(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("not pulled in", error);
//     }
//   };

//   useEffect(() => {
//     fetchShows();
//   }, [showNameSearch]); //re-renders when state changes (after button was pressed with show name)

//   const handleInput = (e) => {
//     setInputValue(e.target.value);
//   };

//   //when button is clicked,
//   const handleSearch = (e) => {
//     e.preventDefault();
//     setShowNameSearch(inputValue);
//   };

//   return (
//     <>
//       <div className={topBar}>
//         <h1>TV Lovers</h1>
//       </div>

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Home
//               handleInput={handleInput}
//               handleSearch={handleSearch}
//               inputValue={inputValue}
//               shows={shows}
//               showNameSearch={showNameSearch}
//             />
//           }
//         />
//         <Route path="/shows/:id" element={<ShowDetail />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { Shows } from "./pages/shows";
import { StoreProvider } from "./store/provider";
import "./theme/variables.css";
import "./App.css";
import { Basket } from "./components/Basket";
import { Layout as LayoutProvider } from "./pages/layout"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shows",
    element: <Shows />,
  },
  {
    path: "/detail/:id",
    element: <Details />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <LayoutProvider>
      <StoreProvider>
        <div className="main-grid">
          <RouterProvider router={router} />
        </div>
      </StoreProvider>
    </LayoutProvider>
  </StrictMode>,
);

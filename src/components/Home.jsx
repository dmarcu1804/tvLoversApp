import {
  mainSection,
  mainContent,
  bottomContent,
  showsDisplayed,
} from ".././elements.module.css";
import DisplayProfiles from "./DisplayProfiles";

const Home = ({
  handleInput,
  handleSearch,
  inputValue,
  shows,
  showNameSearch,
}) => {
  return (
    <>
      <div className={mainSection}>
        <div className="main-text">
          <h1>For the TV obsessed!!!</h1>
          <p>Find out everything about your favourite TV shows.</p>
        </div>

        <div className={mainContent}>
          <form>
            <input
              value={inputValue}
              onChange={handleInput}
              placeholder="enter your fave show name"
            />
            <button type="submit" onClick={handleSearch}>
              search
            </button>
          </form>
        </div>
      </div>

      {/* this displays the Search Results for - if the shows array is populated, then it shows result for show */}
      {shows.length === 0 ? (
        <div className={bottomContent}>
          <h1>Search results for ...</h1>
          <p>Please enter your fave show above and hit 'search'</p>
        </div>
      ) : (
        <div className={bottomContent}>
          <h1>
            Search Results for <em>{showNameSearch}</em>{" "}
          </h1>
        </div>
      )}

      
        <DisplayProfiles shows={shows} />
      
    </>
  );
};

export default Home;

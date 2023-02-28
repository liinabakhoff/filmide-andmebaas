import './App.css'
import { useState, useEffect} from 'react';
import MoviesList from './MoviesList';

function App() {
  const defaultSearchKeyword = 'Eternal'
  const [searchKeyword, setSearchKeyword] = useState(defaultSearchKeyword)
  const [searchKeywordPrev, setSearchKeywordPrev] = useState(defaultSearchKeyword)
  const [searchResult, setSearchResult] = useState({})
  const [searchInputMessage, setSearchInputMessage] = useState('')

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
  }
  const handleSearch = async () => {
    if(searchKeyword.trim().length >= 3){
      setSearchInputMessage('')
      const dataAddress = `https://api.themoviedb.org/3/search/movie?api_key=24c64ea903d3b9426c0b72f5af3d2813&language=en-US&query=${searchKeyword}&include_adult=false`
      const result = await fetch(dataAddress)
      const data = await result.json()
      setSearchResult(data)
      setSearchKeywordPrev(searchKeyword)
      setSearchKeyword('')
    } else {
      setSearchInputMessage(<div className='error'>Please lengthen your search input to 3 characters or more</div>)
    } 
  }

  useEffect(() => {
    handleSearch()
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === "Enter"){
      handleSearch()
    }
  }

  let resultsContainer = <></>
  let resultsData_currentlyShowing = <></>
  if(searchResult.total_results){
    resultsContainer = <MoviesList data={searchResult} />
    resultsData_currentlyShowing = <>Showing {Object.keys(searchResult.results).length}</>
  }
  
  return (
    <div className="App">
      <h1>Filmide andmebaas</h1>
      <label>
        {/* event.key === "Enter" && handleSearch() */}
        {/* is the same as */}
        {/* event.key === "Enter" ? handleSearch() : null */}
        {/* is the same as */}
        {/* if(event.key === "Enter") {handleSearch()} else {null} */}
        <input value={searchKeyword || ''} onChange={handleChange} onKeyDown={(event) => {event.key === "Enter" && handleSearch()}} type="text" /> 
      </label>
      <button onClick={handleSearch}>Otsi</button>
      {searchInputMessage}
      <p>Your search results for: <b>{searchKeywordPrev}</b></p><p>{searchResult.total_results} movies found. {resultsData_currentlyShowing}</p>
      {resultsContainer}
    </div>
  );
}

export default App;
import './App.css'
import { useState } from 'react';
import MoviesList from './MoviesList';

// Kas on üldse vaja onChange? Äkki piisab let muutujast, mis võetakse input-ist enteri/nupu vajutusel
// setSearch('test'); console.log(search) ei ole 'test'
// Miks värskendab MoviesList komponenti iga onChange peale?
// "Your search results for:"
// Inputi valideerimine


function App() {
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState({})
  const handleChange = (event) => {
    //console.log('handleChange: ' + event.target.value)
    setSearch(event.target.value);
  }
  const handleSearch = async () => {
    const dataAddress = "https://api.themoviedb.org/3/search/movie?api_key=24c64ea903d3b9426c0b72f5af3d2813&language=en-US&query=" + search + "&include_adult=false"
    const result = await fetch(dataAddress)
    const data = await result.json()
    console.log(data)
    setSearchResult(data)
    console.log(searchResult)
    setSearchValue(search)
    setSearch('')
    console.log('search state: ' + search)
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter"){
      handleSearch()
    }
  }

  let resultHeader = <div></div>
  if(searchResult.results){
    resultHeader = <h3>Your search results for: <b>{searchValue}</b></h3>
  }
  return (
    <div className="App">
      <h1>Filmide andmebaas</h1>
      <label>
        <input value={search || ''} onChange={handleChange} onKeyDown={handleKeyDown} type="text" />
      </label>
      <button onClick={handleSearch}>Otsi</button>
      {resultHeader}
      <MoviesList data={searchResult} />
    </div>
  );
}

export default App;
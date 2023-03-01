import fallbackImage from './images/icons8-cinema-50.png'
function MoviesList({data}){
    const movieImgUrlBase = 'https://image.tmdb.org/t/p/w300/'
    
    return (
        <div className="movies-container">
            {data.results.map((movie, index) => {
                const getMovieReleaseYear = movie.release_date ? <>, {movie.release_date.substring(0, 4)}</> : <></>
                const getMovieImgUrl  = movie.poster_path ? (movieImgUrlBase + movie.poster_path) : fallbackImage
                return (
                    <div className="movie" key={index}>
                        <img src={getMovieImgUrl} alt={movie.title}/>
                        <h3>{movie.title}{getMovieReleaseYear}</h3>
                    </div>
                )
            })}
        </div>   
    )
}
export default MoviesList
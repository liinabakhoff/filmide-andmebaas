function MoviesList({data}){
    return (
        <div className="movies-container">
            {data.results.map((movie, index) => {
                const getMovieReleaseYear = movie.release_date ? <>, {movie.release_date.substring(0, 4)}</> : <></>
                return (
                    <div className="movie" key={index}>
                        <h3>{movie.title}{getMovieReleaseYear}</h3>
                    </div>
                )
            })}
        </div>   
    )
}
export default MoviesList
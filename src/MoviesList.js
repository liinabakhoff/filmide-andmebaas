function MoviesList({data}){
    console.log('moviesList: ' + data)
    if (data.results) {
        console.log("IF")
        return (
            <div className="movies-container">
                {data.results.map((movie, index) => {
                    return (
                        <div className="movie" key={index}>
                            <h3>{movie.title}, {movie.release_date.substring(0, 4)}</h3>
                        </div>
                    )
                })}
            </div>   
        )
    } else {
       { console.log("ELSE")}
        return <div>No results</div>
    }
}
export default MoviesList
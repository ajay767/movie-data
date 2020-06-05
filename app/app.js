document.querySelector('.search-btn').addEventListener('click', () => {
    let input_value = document.querySelector('#search-text').value;
    console.log(input_value);
    getMovieData(input_value);

})
let button = document.querySelectorAll('.poster');
button.forEach((el)=>{
el.addEventListener('click',()=>{
    let element = document.querySelectorAll('.content');
    element.forEach(()=>{
        element.style.display = "block";
    })
})
})
function getMovieData(value) {
    setTimeout(() => {
        fetch(`https://www.omdbapi.com/?s=${value}&apikey=bea7ac38`)
            .then(Response => Response.json())
            .catch('!not Found. please correct the spelling')
            .then(data => {
                var movie = data.Search;

                for (let i = movie.length - 1; i > 0; i--) {
                    let id = movie[i].imdbID;
                    console.log(id);


                    let html = `<div class="movie-card">
                      <div class="poster"><img src="${movie[i].Poster}"alt="poster"></div>`;


                    fetch(`https://www.omdbapi.com/?i=${id}&apikey=bea7ac38`)
                        .then(Response => Response.json())
                        .then(data => {
                            let newHtml = `<div class="content"><table>
                                          <tr><th>Title:</th><td>${data.Title}</td></tr><tr><th>Director: </th><td>${data.Director}</td></tr><tr><th>Year:</th><td>${data.Year}</td></tr><tr><th>Writer:</th><td>${data.Writer}</td></tr>
                                          <tr><th>Actors:</th> <td>${data.Actors}</td></tr><tr> <th>Plot:</th> <td>${data.Plot}</td> </tr></table>
                                         </div>`

                            let final = html + newHtml;
                            console.log(final)
                            document.querySelector('.cards').insertAdjacentHTML('afterbegin', final);

                        })

                }




            })
            .catch(data => {
                let error = `<div class="error"><p>! Movie not Found . Kindle check the spelling input</p>
            </div>`
                document.querySelector('.cards').insertAdjacentHTML('afterbegin', error);
            });

    })
};
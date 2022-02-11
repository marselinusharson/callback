$(".search-button").on("click", function () {
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=dbd23e51&s=${$(".input-keyword").val()}`,
    success: (results) => {
      const movies = results.Search;

      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      //tombol details di klik
      $(".detail-button").on("click", function () {
        $.ajax({
          url: `http://www.omdbapi.com/?apikey=dbd23e51&i=${$(this).data("imdbid")}`,
          success: (m) => {
            const movieDetail = showMovieDetails(m);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showMovieDetails(m) {
  return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <img class="img-fluid" src="${m.Poster}"/>
            </div>
            <div class="col-md">
                <ul class="list-group">
                        <li class="list-group-item"><h1>${m.Title}</h1></li>
                        <li class="list-group-item"><strong>Directors :</strong>${m.Director}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                        <li class="list-group-item"><strong>Plot:</strong><br> ${m.Plot}</li>
                        <li class="list-group-item"><strong>Writers:</strong>${m.Writer}</li>
                </ul>
                </class=>
            </div>
        </div>
    </div>`;
}
function showCards(m) {
  return `<div class="col-md-4 my-5">
            <div class="card">
                <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                <a href="#" class="btn btn-primary detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show details</a>
            </div>
        </div>
    </div>`;
}

function searchMovie() {
  $("#movie_list").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "3eee2ef9",
      s: $("#search-input").val(), // search input value
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movie_list").append(`
          <div class="col-sm-3 g-3 col-md-4">
            <div class="card">
              <img src="${data.Poster}" height="500" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                <a href="#" class="card-link see_detail" data-bs-toggle="modal"
                data-bs-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
              </div>
            </div>
          </div>
          `);
        });
        $("#search-input").val("");
      } else {
        $("#movie_list").html(`
        <div class="col-sm-4 col-md-6 alert alert-danger" role="alert">
        ${result.Error}
        </div>`);
      }
    },
  });
}

$("#search-btn").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (event) {
  if (event.keyCode === 13) {
    // bisa pakai if (event.which == 13) atau if (event.key == "Enter")
    searchMovie();
  }
});

$("#movie_list").on("click", ".see_detail", function () {
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "3eee2ef9",
      i: $(this).attr("data-id"), //tombol see detail yang sedang di klik
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(`
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="img-fluid">
            </div>
            <div class="col-md-8">
              <p><strong>Title : </strong>${movie.Title}<br>
              <strong>Released : </strong>${movie.Released}</p>
              <p>${movie.Type}</p>
              <p class="text-muted">Genre : ${movie.Genre}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p class="text-muted">${movie.Plot}</p>  
            </div>
          </div>
        </div>
        `);
      }
    },
  });
});

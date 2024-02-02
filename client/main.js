const form = document.getElementById(`form`);
const movieContainer = document.getElementById(`movie-container`);
const baseURL = `http://localhost:4242`;

form.addEventListener(`submit`, async (e) => {
  const formData = new FormData(form);
  const movieData = Object.fromEntries(formData);

  const response = await fetch(`${baseURL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });
  if (response.ok) {
    displayMovies();
  } else {
    console.error("Failed to add movie", response.status);
  }
});

//fetches all mvoies and returns that
async function fetchMovies() {
  const movies = await fetch(`${baseURL}/movies`);
  //parsed into an array instead pf being json
  let result = await movies.json();
  return result;
}

//display movies

async function displayMovies() {
  //movies is an array of all movies in my db
  let movies = await fetchMovies();
  movieContainer.innerHTML = "";
  //for  each movie in array
  movies.forEach((movie) => {
    //create images in html
    let h3Tag = document.createElement("h3");
    let pTag = document.createElement("p");
    let imgTag = document.createElement("img");
    let delButton = document.createElement("p");
    let infoDiv = document.createElement(`div`);
    let movieCard = document.createElement(`div`);
    h3Tag.textContent = movie.movie;
    h3Tag.setAttribute(`class`, `movieTitle`);
    pTag.textContent = movie.year;
    imgTag.src = movie.imgURL;
    delButton.textContent = `X`;

    // delete button
    delButton.addEventListener(`Click `, (e) => {
      e.preventDefault();
      //delete function
      handleDelete(movie.id);
    });
    infoDiv.appendChild(h3Tag);
    infoDiv.appendChild(pTag);
    movieCard.appendChild(delButton);
    movieCard.appendChild(infoDiv);
    movieCard.appendChild(imgTag);

    movieContainer.appendChild(movieCard);
  });
}

//handle delete async function
async function handleDelete(id) {
  const result = await fetch(`${baseURL}/movies/${id}`, {
    method: "DELETE",
  });
  //log result
  console.log(results);
  if (result.ok) {
    displayMovies();
  }
}

//display movie function
displayMovies();

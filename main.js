const api = "efcd1bdc";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const filmsContainer = document.getElementById("films-container");

searchBtn.addEventListener("click", handleClick);

async function handleClick(e) {
  e.preventDefault();

  let film = searchInput.value;

  const res = await fetch(`https://www.omdbapi.com/?apikey=${api}&s=${film}`);
  const data = await res.json();

  extendsDatas(data);
}

async function extendsDatas(data) {
  let filmDetailsArray = [];

  if (data.Search) {
    for (const film of data.Search) {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${api}&t=${film.Title}`,
      );
      const data = await res.json();
      filmDetailsArray.push(data);
    }
    renderDatas(filmDetailsArray);
  } else {
    renderDatas([]);
  }
}

function renderDatas(filmDetailsArray) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []; // Recuperar la watchlist
  filmsContainer.innerHTML = "";

  if (filmDetailsArray.length > 0) {
    filmDetailsArray.map((film) => {
      const isInWatchlist = watchlist.some(
        (item) => item.imdbID === film.imdbID,
      ); // Comprobar si la película está en la watchlist
      filmsContainer.innerHTML += `
      <div class="pt-11 pb-5 px-11 flex gap-5 items-center text-white">
          <img class="w-24" src=${film.Poster} alt="Poster of ${film.Title}">
          <div class="flex flex-col gap-2"> 
            <div class="flex items-center gap-1">
              <h3 class="max-w-[75%] text-white text-lg font-medium leading-5">${film.Title}</h3>
              <i class="fa-solid fa-star text-yellow-300"></i>
              <p class="text-white text-xs">${film.Metascore / 10}</p>
            </div>
            <div class="flex items-center gap-5">
              <p class="text-white text-xs">${film.Runtime}</p>
              <p class="text-white text-xs">${film.Genre}</p>
              <div class="flex">
                <i class="fa-solid ${isInWatchlist ? "fa-square-minus" : "fa-circle-plus"} mr-1 cursor-pointer add-to-watchlist" data-film-id="${film.imdbID}"></i>
                <p class="text-white text-xs">Watchlist</p>
              </div>
            </div>
            <p class="text-gray-400 text-sm">${film.Plot}</p>
          </div>   
        </div>
        <hr class="bg-gray-400 border-none h-0.5 w-[80%] m-auto">
    `;
    });

    // Añadir el evento de clic a cada ícono de añadir
    const addButtons = document.querySelectorAll(".add-to-watchlist");
    addButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const filmId = e.target.getAttribute("data-film-id");
        const film = filmDetailsArray.find((f) => f.imdbID === filmId);
        addToWatchlist(film, e.target); // Llamar a la función que guarda en LocalStorage
      });
    });
  } else {
    filmsContainer.innerHTML = `
      <p class="w-2/3 text-center text-[#2e2e2f] text-lg">
        Unable to find what you’re looking for. Please try another search.
      </p>
    `;
  }
}

function addToWatchlist(film, iconElement) {
  // Recuperar la watchlist del LocalStorage o inicializarla como un array vacío
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  // Evitar duplicados: solo agregar si la película no está ya en la watchlist
  const exists = watchlist.some((item) => item.imdbID === film.imdbID);
  if (!exists) {
    watchlist.push(film);
    // Cambiar el ícono a 'minus'
    iconElement.classList.remove("fa-circle-plus");
    iconElement.classList.add("fa-square-minus");
  } else {
    // Si ya existe, puedes decidir si quitarla de la watchlist
    watchlist = watchlist.filter((item) => item.imdbID !== film.imdbID);
    // Cambiar el ícono de vuelta a 'plus'
    iconElement.classList.remove("fa-square-minus");
    iconElement.classList.add("fa-circle-plus");
  }

  // Guardar la lista actualizada en LocalStorage
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

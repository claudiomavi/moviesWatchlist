const api = "efcd1bdc";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const filmsContainer = document.getElementById("films-container");

searchBtn.addEventListener("click", handleClick);

async function handleClick(e) {
  e.preventDefault();

  let film = searchInput.value;

  const res = await fetch(`http://www.omdbapi.com/?apikey=${api}&s=${film}`);
  const data = await res.json();

  extendsDatas(data);
}

async function extendsDatas(data) {
  let filmDetailsArray = [];

  for (const film of data.Search) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${api}&t=${film.Title}`,
    );
    const data = await res.json();
    filmDetailsArray.push(data);
  }

  renderDatas(filmDetailsArray);
}

function renderDatas(filmDetailsArray) {
  console.log(filmDetailsArray);
  filmsContainer.innerHTML = "";
  filmDetailsArray.map((film) => {
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
                <i class="fa-solid fa-circle-plus mr-1"></i>
                <p class="text-white text-xs">Watchlist</p>
              </div>
            </div>
            <p class="text-gray-400 text-sm">${film.Plot}</p>
          </div>   
        </div>
        <hr class="bg-gray-400 border-none h-0.5 w-[80%] m-auto">
    `;
  });
}

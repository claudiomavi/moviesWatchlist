document.addEventListener("DOMContentLoaded", function () {
  const main = document.querySelector("main");
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (watchlist.length === 0) {
    main.innerHTML = `
        <div class="flex h-screen flex-col items-center justify-center">
          <p
            class="w-full text-center text-lg font-bold leading-7 text-[#2e2e2f]"
          >
            Your watchlist is looking a little empty...
          </p>
          <div class="flex items-center justify-center pt-4">
            <a class="mr-1 flex items-center justify-center" href="./index.html">
              <i
                class="fa-solid fa-circle-plus cursor-pointer text-lg text-white"
              ></i>
            </a>
            <p class="text-sm font-bold leading-5 text-white">
              Let’s add some movies!
            </p>
          </div>
        </div>
        `;
  } else {
    watchlist.forEach((film) => {
      const filmItem = document.createElement("div");
      filmItem.classList.add(
        "film-item",
        "pt-11",
        "pb-5",
        "px-11",
        "flex",
        "gap-5",
        "items-center",
        "text-white",
      );

      filmItem.innerHTML = `
                <img class="w-24" src="${film.Poster}" alt="Poster of ${film.Title}">
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
                            <i class="fa-solid fa-square-minus mr-1 cursor-pointer remove-from-watchlist" data-film-id="${film.imdbID}"></i>
                            <p class="text-white text-xs">Remove</p>
                        </div>
                    </div>
                    <p class="text-gray-400 text-sm">${film.Plot}</p>
                </div>
            `;

      // Crear el elemento <hr> y añadirlo a filmItem
      const hr = document.createElement("hr");
      hr.className = "bg-gray-400 border-none h-0.5 w-[80%]";

      // Añadir ambos elementos al main
      main.appendChild(filmItem);
      main.appendChild(hr);
    });

    // Añadir el evento de clic a cada ícono de eliminar
    const removeButtons = document.querySelectorAll(".remove-from-watchlist");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const filmId = e.target.getAttribute("data-film-id");
        removeFromWatchlist(filmId);

        // Eliminar el elemento de la película y el hr correspondiente
        const filmItem = e.target.closest(".film-item"); // Encuentra el contenedor de la película
        filmItem.nextElementSibling.remove(); // Elimina el hr siguiente
        filmItem.remove(); // Elimina el contenedor de la película

        // Si la watchlist está vacía, mostrar el mensaje
        if (main.children.length === 0) {
          main.innerHTML = `
                        <div class="flex h-screen flex-col items-center justify-center">
                          <p
                            class="w-full text-center text-lg font-bold leading-7 text-[#2e2e2f]"
                          >
                            Your watchlist is looking a little empty...
                          </p>
                          <div class="flex items-center justify-center pt-4">
                            <a class="mr-1 flex items-center justify-center" href="./index.html">
                              <i
                                class="fa-solid fa-circle-plus cursor-pointer text-lg text-white"
                              ></i>
                            </a>
                            <p class="text-sm font-bold leading-5 text-white">
                              Let’s add some movies!
                            </p>
                          </div>
                        </div>
                    `;
        }
      });
    });
  }
});

function removeFromWatchlist(filmId) {
  // Recuperar la watchlist del LocalStorage
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  // Filtrar la película que se va a eliminar
  watchlist = watchlist.filter((item) => item.imdbID !== filmId);

  // Guardar la lista actualizada en LocalStorage
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

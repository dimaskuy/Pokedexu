const container = document.querySelector(".pokeContainer");
const regionBox = document.querySelectorAll("[data-type=region]");
let pokeType = [];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// let result = [];
function fetchPokemon(url) {
  const fetchPoke = fetch(url)
    .then((data) => data.json())
    .then((pokemon) => {
      const result = pokemon.pokemon_entries || pokemon.results;

      let stringHTML = result.map((poke, index) => {
        const pokeID =
          poke.pokemon_species.url
            .slice(42, poke.pokemon_species.url.length - 1)
            .split("https://pokeapi.co/api/v2/pokemon-species")
            .join("") ||
          poke.url
            .slice(42, poke.url - 1)
            .split("https://pokeapi.co/api/v2/pokemon-species")
            .join("");

        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
          .then((data) => data.json())
          .then((blob) => {
            blob.types
              .map((type) => {
                //   displayPokemon(poke.pokemon_species.url || poke.url, pokeUrl, capitalize(poke.pokemon_species.name) || capitalize(poke.name), type);
                return `<div class="pokeBox md:w-52 md:h-52 w-full h-full px-2 pb-8 lg:px-4 lg:pt-2 lg:pb-8 bg-white rounded-3xl flex justify-center items-center flex-col text-center cursor-pointer relative transition-all shadow-xl group" data-pokeUrl="${
                  poke.pokemon_species.url || poke.url
                }">
            <span class="absolute right-0 top-0 mx-3 my-1 w-7 h-7 flex justify-center items-center rounded-full bg-indigo-50 text-sm sm:text-base text-slate-700 group-hover:text-slate-800 opacity-90 group-hover:opacity-100">${pokeID}</span>
          <div class="pokeImg group-hover:animate-jump2">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png" alt="${
                  capitalize(poke.pokemon_species.name) || capitalize(poke.name)
                }" class="w-28 md:w-28 group-hover:scale-105 md:group-hover:scale-110 transition-all" />
          </div>
          <div class="info">
            <h2 class="text-lg md:text-xl font-bold leading-relaxed group-hover:text-indigo-600">${capitalize(poke.pokemon_species.name) || capitalize(poke.name)}</h2>
            <p class="text-sm sm:text-base font-medium text-slate-600">${type.type.name}</p>
          </div>
        </div>`;
              })
              .join("");
          });
      });
      container.innerHTML = stringHTML;
      console.log(stringHTML);
    })
    .catch((error) => {
      console.error(error);
      container.innerHTML = `<figure class="text-center my-6 md:my-12">
          <figcaption class="text-sm md:text-base text-indigo-600 font-bold">Something went wrong here. Please try again later..</figcaption>
          <img src="img/snorlax.png" alt="Snorlax Error Page" class="mx-auto mt-8 w-28 md:w-44 opacity-80" />
        </figure>`;
    });
  fetchPoke.then((p) => {
    console.log(p);
  });
}

function displayPokemon(url, pokeUrl, capName, type) {
  return `<div class="pokeBox md:w-52 md:h-52 w-full h-full px-2 pb-8 lg:px-4 lg:pt-2 lg:pb-8 bg-white rounded-3xl flex justify-center items-center flex-col text-center cursor-pointer relative transition-all shadow-xl group" data-pokeUrl="${url}">
            <span class="absolute right-0 top-0 mx-3 my-1 w-7 h-7 flex justify-center items-center rounded-full bg-indigo-50 text-sm sm:text-base text-slate-700 group-hover:text-slate-800 opacity-90 group-hover:opacity-100">${pokeUrl}</span>
          <div class="pokeImg group-hover:animate-jump2">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeUrl}.png" alt="${capName}" class="w-28 md:w-28 group-hover:scale-105 md:group-hover:scale-110 transition-all" />
          </div>
          <div class="info">
            <h2 class="text-lg md:text-xl font-bold leading-relaxed group-hover:text-indigo-600">${capName}</h2>
            <p class="text-sm sm:text-base font-medium text-slate-600">${type}</p>
          </div>
        </div>`.join("");
}

function loadingBox() {
  container.innerHTML = `<div class="pokeBox-loading md:w-52 md:h-52 w-full h-full px-2 pb-8 lg:px-4 lg:pt-2 lg:pb-8 bg-white rounded-3xl flex justify-center items-center flex-col text-center cursor-pointer group relative animate-pulse">
          <span class="absolute right-0 top-0 mx-3 my-1 w-7 h-7 rounded-full bg-indigo-50 text-sm sm:text-base text-slate-700 group-hover:text-slate-800 opacity-90 group-hover:opacity-100 animate-pulse"></span>
          <div class="pokeImg-loading w-full h-28 bg-slate-200 mb-4 mt-8 animate-pulse"></div>
          <div class="info-loading w-full h-6 bg-slate-200 animate-pulse"></div>
          <div class="mt-4 w-28 h-5 bg-slate-100 animate-pulse"></div>
        </div>
        <div class="pokeBox-loading md:w-52 md:h-52 w-full h-full px-2 pb-8 lg:px-4 lg:pt-2 lg:pb-8 bg-white rounded-3xl flex justify-center items-center flex-col text-center cursor-pointer group relative animate-pulse">
          <span class="absolute right-0 top-0 mx-3 my-1 w-7 h-7 rounded-full bg-indigo-50 text-sm sm:text-base text-slate-700 group-hover:text-slate-800 opacity-90 group-hover:opacity-100 animate-pulse"></span>
          <div class="pokeImg-loading w-full h-28 bg-slate-200 mb-4 mt-8 animate-pulse"></div>
          <div class="info-loading w-full h-6 bg-slate-200 animate-pulse"></div>
          <div class="mt-4 w-28 h-5 bg-slate-100 animate-pulse"></div>
        </div>
        <div class="pokeBox-loading md:w-52 md:h-52 w-full h-full px-2 pb-8 lg:px-4 lg:pt-2 lg:pb-8 bg-white rounded-3xl flex justify-center items-center flex-col text-center cursor-pointer group relative animate-pulse">
          <span class="absolute right-0 top-0 mx-3 my-1 w-7 h-7 rounded-full bg-indigo-50 text-sm sm:text-base text-slate-700 group-hover:text-slate-800 opacity-90 group-hover:opacity-100 animate-pulse"></span>
          <div class="pokeImg-loading w-full h-28 bg-slate-200 mb-4 mt-8 animate-pulse"></div>
          <div class="info-loading w-full h-6 bg-slate-200 animate-pulse"></div>
          <div class="mt-4 w-28 h-5 bg-slate-100 animate-pulse"></div>
        </div>`;
}

regionBox.forEach((region) => {
  region.addEventListener("click", function (e) {
    console.log("Fetching Region ID: ", this.dataset.regionid);
    const regionID = this.dataset.regionid;
    loadingBox();
    fetchPokemon(`https://pokeapi.co/api/v2/pokedex/${regionID}/`);
  });
});

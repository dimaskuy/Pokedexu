const container = document.querySelector(".pokeContainer");
const regionBox = document.querySelectorAll("[data-type=region]");
const inputPoke = document.getElementById("searchPokemon");
const submitPoke = document.getElementById("searchButton");
const searchForm = document.querySelector(".inputPokemonForm");
const toTopBtn = document.getElementById("to-top");
const pokeInfoLayer = document.getElementById("poke-info-layer");
const closeBtn = pokeInfoLayer.querySelectorAll(".close-popup-btn");
const pokeInfoMain = document.getElementById("info-main");
let prevSection;
let pokeBox = [];

// CAPITALIZE THE CHARACTERS
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// let resultType = [];
// function fetchPokeType(id) {
//   const prom = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((data) => data.json());
//   //   .then((blob) => {
//   //     resultType.push(blob);
//   //     // blob.types.map((type) => {
//   //     //   resultType.push(type.type);
//   //     // });
//   //   });
//   // // console.log(resultType);
//   // return resultType;
//   return prom;
// }

// FETCHING ALL POKEMON FROM POKEDEX REGION
const fetchPokemon = async (url) => {
  if (!pokeBox.length === 0) {
    pokeBox.splice(0, pokeBox.length);
  }

  fetch(url)
    .then((data) => data.json())
    .then((pokemon) => {
      const result = pokemon.pokemon_entries || pokemon.results;

      let stringHTML = result
        .map((poke, index) => {
          const pokeUrl = poke.pokemon_species.url || poke.url;
          const pokeName = capitalize(poke.pokemon_species.name) || capitalize(poke.name);
          const pokeID =
            poke.pokemon_species.url
              .slice(42, poke.pokemon_species.url.length - 1)
              .split("https://pokeapi.co/api/v2/pokemon-species")
              .join("") ||
            poke.url
              .slice(42, poke.url - 1)
              .split("https://pokeapi.co/api/v2/pokemon-species")
              .join("");

          // let arrType = [];
          // const promiseType = fetchPokeType(pokeID);
          // promiseType.then((blob) => {
          //   blob.types.map((type) => {
          //     const arr = new Array(type.type.name);
          //     arrType.push(arr);
          //   });
          // });
          // console.log(arrType);

          return displayPokemon(pokeUrl, pokeID, pokeName);
        })
        .join("");
      // console.log(stringHTML);
      container.innerHTML = stringHTML;
      prevSection = stringHTML;

      const box = document.querySelectorAll(".pokeBox");
      pokeBox.push(box);
    })
    .catch((error) => {
      console.error(error);
      container.innerHTML = `<figure class="text-center my-6 md:my-12">
          <figcaption class="text-sm md:text-base text-indigo-600 font-bold">Something went wrong here. Please try again later..</figcaption>
          <img src="img/snorlax.png" alt="Snorlax Error Page" class="mx-auto mt-8 w-28 md:w-44 opacity-80" />
        </figure>`;
    });
};

// DISPLAYING POKEMON BOX
function displayPokemon(pokeUrl, pokeID, pokeName) {
  return `<div class="pokeBox md:w-52 md:h-52 w-full h-full px-2 pb-8 lg:px-4 lg:pt-2 lg:pb-8 bg-white rounded-3xl flex justify-center items-center flex-col text-center cursor-pointer relative transition-all hover:shadow-xl group" data-pokeurl="${pokeUrl}" data-pokeid="${pokeID}">
            <span class="pokeBox-text absolute right-0 top-0 mx-3 my-1 w-7 h-7 flex justify-center items-center rounded-full bg-indigo-50 text-sm sm:text-base text-slate-700 group-hover:text-slate-800 opacity-90 group-hover:opacity-100">${pokeID}</span>
          <div class="pokeImg group-hover:animate-jump2">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png" alt="${pokeName}" class="pokeImg-img w-28 md:w-32 group-hover:scale-105 md:group-hover:scale-110 transition-all" />
          </div>
          <div class="info">
            <h2 class="info-text text-lg md:text-xl font-bold leading-relaxed  group-hover:text-indigo-600 tracking-wide">${pokeName}</h2>
          </div>
        </div>`;
}

// SHOW LOADING BOX
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

// SEARCH POKEMON
function searchPokemonFunc(target) {
  loadingBox();
  const inputValue = target.value.trim() || inputPoke.value.trim();
  if (inputValue === "" || inputValue.length === 0 || !inputValue) {
    loadingBox();
    container.innerHTML = prevSection;
  }

  const regex = new RegExp(inputValue, "gi");
  let isMatchReg = false;
  let searchStr;

  pokeBox.map((node) => {
    searchStr = Array.from(node)
      .map((el) => {
        const text = capitalize(el.querySelector("h2").textContent);
        const pokeID = el.querySelector("span").textContent;
        const pokeUrl = el.dataset.pokeurl || el.dataset.pokeUrl;

        if (text.match(regex)) {
          isMatchReg = true;
          return displayPokemon(pokeUrl, pokeID, text);
        }
      })
      .join("");
  });
  if (isMatchReg) return (container.innerHTML = searchStr);
  container.innerHTML = `<figure class="text-center my-6 md:my-12">
          <figcaption class="text-sm md:text-base text-indigo-600 font-bold">PIKAA?! There is no pokemon with that name.</figcaption>
          <img src="img/psyduck.png" alt="Snorlax Error Page" class="mx-auto mt-8 w-28 md:w-44 opacity-80" />
        </figure>`;
}

regionBox.forEach((region) => {
  region.addEventListener("click", function (e) {
    document.querySelector(".inputPokemonSection").style.display = "block";
    document.querySelector(".instruct-text").style.display = "none";

    // console.log("Fetching Region ID: ", this.dataset.regionid);

    const regionID = this.dataset.regionid;
    loadingBox();
    fetchPokemon(`https://pokeapi.co/api/v2/pokedex/${regionID}/`);
  });
});

inputPoke.addEventListener("input", function () {
  searchPokemonFunc(inputPoke);
});
submitPoke.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(inputPoke);
  searchPokemonFunc(inputPoke);
});
searchForm.addEventListener("submit", function () {
  searchPokemonFunc(inputPoke);
});

// SCROLL TO TOP PAGE
function removeToTopBtn() {
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
    toTopBtn.style.transform = "scale(1) translateY(0)";
  } else {
    toTopBtn.style.transform = "scale(0) translateY(100vh)";
  }
}

function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.addEventListener("scroll", removeToTopBtn);
toTopBtn.addEventListener("click", toTop);

// POKEMON INFO POPUP
function displayElementPopup(pokeID, pokeName, pokeType, pokeAbility, pokeExp, pokeWeight, pokeHeight, pokeHP, pokeAttack, pokeDefense, pokeSpeed, pokeSpecAttack, pokeSpecDefense) {
  return `<div class="title flex justify-start items-center flex-row md:flex-row group">
              <span class="mx-3 mr-4 md:mr-6 md:w-10 md:h-10 w-8 h-8 p-2 flex justify-center items-center rounded-full transition-all bg-indigo-500 group-hover:bg-indigo-600 text-white text-base opacity-90">${pokeID}</span>
                <h1 class="text-3xl md:text-4xl font-bold font-pixel group-hover:text-indigo-600 tracking-wide" id="name-title">${pokeName}</h1>
              <button type="button" class="relative ml-6 transition-all scale-0 group-hover:scale-100 -translate-x-8 group-hover:translate-x-0 flex justify-center items-center w-8 h-8 rounded-full active:bg-indigo-200" id="copy-btn">
                <span><img src="bootstrap-icons/icons/clipboard2-fill.svg" alt="Copy Text" class="md:w-5 w-6" id="copy-btn-icon"></span>
              </button>
            </div>

            <div class="detail-container flex md:justify-between lg:justify-around align-center flex-col lg:flex-row">
              <div class="detail lg:w-1/2 w-4/5 mt-10 ml-4 md:flex lg:block justify-between items-center order-2 lg:order-1">
                <ul class="detail-data">
                  <h2 class="font-bold text-xl text-slate-800 mb-2">Basic Info</h2>
                  <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Type:</span> ${pokeType}.</li>
                  <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Ability:</span> ${pokeAbility}.</li>
                  <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Base Experience:</span> ${pokeExp}</li>
                  <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Weight:</span> ${pokeWeight} kg.</li>
                  <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Height:</span> ${pokeHeight} cm.</li>
                </ul>

                <div class="base-stats mt-8">
                  <h2 class="font-bold text-xl text-slate-800">Base Stats</h2>
                  <ul class="detail-data mt-4">
                    <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">HP:</span> ${pokeHP}</li>
                    <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Attack:</span> ${pokeAttack}</li>
                    <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Defense:</span> ${pokeDefense}</li>
                    <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Speed:</span> ${pokeSpeed}</li>
                    <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Special Attack:</span> ${pokeSpecAttack}</li>
                    <li class="font-medium text-base"><span class="text-indigo-600 font-bold mr-1">Special Defense:</span> ${pokeSpecDefense}</li>
                  </ul>
                </div>
              </div>

              <div class="images-sprites order-1 lg:order-2 mt-10 lg:mt-0">
                <figure class="image-preview flex justify-center items-center rounded-3xl transition-all group" data-tilt data-tilt-reverse="true" data-tilt-glare data-tilt-max-glare="0.3">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png" alt="" class="poke-img md:w-56 w-48 transition-all group-hover:scale-110" data-pokename="${pokeName}" data-pokeid="${pokeID}" data-position="front" data-shiny="false">
                </figure>
                <div class="toggle-images flex justify-center items-center md:flex-row lg:flex-col flex-col md:gap-x-4 lg:gap-y-2 gap-y-2 mt-6">
                  <button type="button" class="switch-pos-img md:w-1/2 lg:w-full w-full bg-indigo-600 hover:bg-indigo-500 p-2 rounded-xl transition-all active:scale-95">
                    <span class="text-white md:text-base text-sm font-medium" id="switch-icon-text">Switch Position <img class="inline-block ml-1" src="bootstrap-icons/icons/arrow-repeat.svg" alt="Switch icon" id="switch-icon"></span>
                  </button>
                  <button type="button" class="shiny-pokemon-img md:w-1/2 lg:w-full w-full bg-indigo-600 hover:bg-indigo-500 p-2 rounded-xl transition-all active:scale-95">
                    <span class="text-white md:text-base text-sm font-medium" id="shiny-icon-text">Shiny Pokémon! <img class="inline-block ml-1" src="bootstrap-icons/icons/stars.svg" alt="Switch icon" id="shiny-icon"></span>
                  </button>
                </div>
              </div>
            </div>`;
}

function loadingInfo() {
  pokeInfoMain.innerHTML = `<div class="title-loading flex justify-start items-center flex-row md:flex-row group">
              <span class="mx-3 mr-4 md:mr-6 md:w-10 md:h-10 w-8 h-8 p-2 items-center rounded-full bg-indigo-300 opacity-90 animate-pulse"></span>
                <div class="lg:w-1/2 w-3/4 lg:h-10 h-8 bg-slate-400 animate-pulse rounded-xl"></div>
            </div>

            <div class="mx-auto detail-container-loading flex md:justify-between lg:justify-around align-center flex-col lg:flex-row">
              <div class="detail-loading lg:w-1/2 w-4/5 mt-10 ml-4 md:flex lg:block justify-between items-center order-2 lg:order-1">
                <ul class="detail-data-loading md:w-1/2 mr-20 lg:w-[unset]">
                  <div class="lg:w-1/3 w-3/5 h-6 bg-slate-400 mb-4 rounded animate-pulse"></div>

                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                </ul>

                <div class="base-stats-loading lg:mt-8 md:w-1/2 lg:w-[unset]">
                  <ul class="detail-data-loading">
                  <div class="lg:w-1/3 w-3/5 h-6 bg-slate-400 mb-4 rounded animate-pulse"></div>

                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                  <li class="inline-block lg:w-1/6 w-1/3 h-6 bg-slate-300 rounded mr-2 mb-2 animate-pulse"></li><div class="inline-block lg:w-1/2 w-3/5 h-6 bg-slate-300 rounded mb-2 animate-pulse"></div> <br>
                </ul>
                </div>
              </div>

              <div class="images-sprites-loading lg:w-2/5 w-full order-1 lg:order-2 mt-10 lg:mt-8">
                <figure class="image-preview-loading w-full md:h-56 h-48 flex justify-center items-center rounded-xl transition-all animate-pulse"></figure>
                <div class="toggle-images-loading flex justify-center items-center md:flex-row lg:flex-col flex-col md:gap-x-4 lg:gap-y-2 gap-y-2 mt-6">
                  <div class="md:w-1/2 lg:w-full w-full md:h-10 h-8 rounded-xl bg-indigo-400 opacity-80 animate-pulse"></div>
                  <div class="md:w-1/2 lg:w-full w-full md:h-10 h-8 rounded-xl bg-indigo-400 opacity-80 animate-pulse"></div>
                </div>
              </div>
            </div>`;
}

function showInfoPopup(e) {
  document.body.style.overflow = "hidden";
  pokeInfoLayer.style.opacity = "1";
  pokeInfoLayer.style.transform = "scale(1)";
  pokeInfoLayer.querySelector("#poke-info").style.opacity = "1";
  pokeInfoLayer.querySelector("#poke-info").style.transform = "scale(1) translateY(0px)";
  // pokeInfoLayer.querySelector("#poke-info").style.transform = "translateY(0px)";
  // pokeInfoLayer.style.display = "flex";

  let pokeBox = e.target;
  if (e.target.classList.contains("pokeImg-img") || e.target.classList.contains("info-text")) {
    pokeBox = e.target.parentElement.parentElement;
  } else if (e.target.classList.contains("pokeBox-text") || e.target.classList.contains("pokeImg") || e.target.classList.contains("info")) {
    pokeBox = e.target.parentElement;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeBox.dataset.pokeid}`)
    .then((blob) => blob.json())
    .then((data) => {
      // loadingInfo();
      const pokeID = data.id;
      const pokeName = capitalize(data.name);
      let pokeType = [];
      let pokeAbility = [];

      data.abilities.forEach((obj) => {
        const ability = capitalize(obj.ability.name);
        pokeAbility.push(ability);
      });
      data.types.forEach((obj) => {
        const type = capitalize(obj.type.name);
        pokeType.push(type);
      });

      const pokeExp = data.base_experience;
      const pokeWeight = data.weight / 10;
      const pokeHeight = data.height * 10;
      const pokeStats = data.stats;
      const pokeHP = pokeStats[0].base_stat;
      const pokeAttack = pokeStats[1].base_stat;
      const pokeDefense = pokeStats[2].base_stat;
      const pokeSpeed = pokeStats[5].base_stat;
      const pokeSpecAttack = pokeStats[3].base_stat;
      const pokeSpecDefense = pokeStats[4].base_stat;
      pokeInfoMain.innerHTML = displayElementPopup(pokeID, pokeName, pokeType.join(", "), pokeAbility.join(", "), pokeExp, pokeWeight, pokeHeight, pokeHP, pokeAttack, pokeDefense, pokeSpeed, pokeSpecAttack, pokeSpecDefense);
    })
    .catch((error) => {
      console.log(error);
    });
}

// CHANGE THE POSITION / SHINY POKEMON IMAGES INFO
let shiny = false;
let position = "front";
window.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("switch-pos-img") ||
    e.target.id === "switch-icon-text" ||
    e.target.id === "switch-icon" ||
    e.target.classList.contains("shiny-pokemon-img") ||
    e.target.id === "shiny-icon-text" ||
    e.target.id === "shiny-icon"
  ) {
    let spritesContainer = e.target.parentElement.parentElement;
    if (e.target.id === "switch-icon-text" || e.target.id === "shiny-icon-text") {
      spritesContainer = e.target.parentElement.parentElement.parentElement;
    } else if (e.target.id === "switch-icon" || e.target.id === "shiny-icon") {
      spritesContainer = e.target.parentElement.parentElement.parentElement.parentElement;
    }

    const img = spritesContainer.querySelector(".image-preview img");
    const imgID = img.dataset.pokeid;

    if (e.target.classList.contains("switch-pos-img") || e.target.id === "switch-icon-text" || e.target.id === "switch-icon") {
      if (position === "front") {
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back${shiny ? "/shiny" : ""}/${imgID}.png`;
        position = "back";
      } else if (position === "back") {
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${shiny ? "/shiny" : ""}/${imgID}.png`;
        position = "front";
      }
    } else if (e.target.classList.contains("shiny-pokemon-img") || e.target.id === "shiny-icon-text" || e.target.id === "shiny-icon") {
      if (shiny === false) {
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${position === "back" ? "/back" : ""}/shiny/${imgID}.png`;
        shiny = true;
      } else if (shiny === true) {
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${position === "back" ? "/back" : ""}/${imgID}.png`;
        shiny = false;
      }
    }
  }
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("pokeBox") ||
    e.target.classList.contains("pokeImg-img") ||
    e.target.classList.contains("info-text") ||
    e.target.classList.contains("pokeBox-text") ||
    e.target.classList.contains("pokeImg") ||
    e.target.classList.contains("info")
  ) {
    showInfoPopup(e);
  }
});

function closePopup(e) {
  if (!e.target.classList.contains("info-layer") && !e.target.classList.contains("close-popup-btn") && !e.target.classList.contains("close-icon")) return;
  e.stopPropagation();
  document.body.style.overflow = "scroll";
  pokeInfoLayer.style.opacity = "0";
  pokeInfoLayer.querySelector("#poke-info").style.opacity = "0";
  setTimeout(() => {
    pokeInfoLayer.style.transform = "scale(0)";
    pokeInfoLayer.querySelector("#poke-info").style.transform = "scale(0) translateY(100vh)";
  }, 150);

  // resetting all values
  loadingInfo();
  shiny = false;
  position = "front";
}

pokeInfoLayer.addEventListener("click", (e) => closePopup(e));
closeBtn.forEach((btn) => {
  addEventListener("click", (e) => closePopup(e));
});

function copyName() {
  const target = document.getElementById("name-title");
  navigator.clipboard.writeText(target.textContent);
  document.getElementById("copy-btn-icon").src = "bootstrap-icons/icons/check2.svg";
  setTimeout(() => (document.getElementById("copy-btn-icon").src = "bootstrap-icons/icons/clipboard2-fill.svg"), 1000);
}
window.addEventListener("click", (e) => {
  if (e.target.id === "copy-btn" || e.target.id === "copy-btn-icon") {
    copyName();
  }
});

// ========
// TRASH SCRIPT
// fetchPokemon("https://pokeapi.co/api/v2/pokemon/?limit=898");
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png
// const text = el.textContent;
// const pokeID = el.parentElement.parentElement.querySelector("span").textContent;
// const pokeUrl = el.parentElement.parentElement.dataset.pokeurl || el.parentElement.parentElement.dataset.pokeUrl;
// <p class="text-sm sm:text-base font-medium text-slate-600"></p>;

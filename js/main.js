const form = document.getElementById('form');
const input = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');

//guardamos el array de los pokemones
let pokemones = JSON.parse(localStorage.getItem('pokemon')) || [];

//funcion para guardar en el localstorage
const saveLocalStorage = pokemonList => {
    localStorage.setItem('pokemones', JSON.stringify(pokemonList));
};

//funcion para renderizar HTML
const renderPokemon = (pokemon) =>{
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => types.indexOf(type) > -1);
    return `
    <div class="card-animate">
    <i class="fa-solid fa-x close" data-id="${pokemon.id}"></i>
    </div>
    <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${pokemon.name}">
    </div>
    <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type>Type: <span>${type}</span></small>
    </div>
    `
}
//funcion para la logica de renderizar
const renderPokemonList = pokemonList =>{
    cardContainer.innerHTML = pokemonList.map(pokemon => renderPokemon (pokemon)).join('');
}

//funcion para buscar pokemones
const searchPokemon = async e => {
    e.preventDefault();
    
    //capturamos el valor del input
    const searchedPokemon = input.value.trim();

    if(searchedPokemon === ''){
        alert('Ingrese un número');
        return;
    }

    //pasar el valor del input a la funcion requestPokemon
    const fetchedPokemon = await requestPokemon(searchedPokemon);

    pokemones = [fetchedId, ...pokemones];

    renderPokemonList(pokemones);
    saveLocalStorage(pokemones);
    form.reset();
};

//funcion general para llamar todo
const init = () =>{
    form.addEventListener('submit', searchPokemon);
};
init();
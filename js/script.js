const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const typesContainer = document.getElementById("types");
const imgElement = document.getElementById("sprite");
const hpSpan = document.getElementById("hp");
const attackSpan = document.getElementById("attack");
const defenseSpan = document.getElementById("defense");
const spAttackSpan = document.getElementById("special-attack");
const spDefenseSpan = document.getElementById("special-defense");
const speedSpan = document.getElementById("speed");
const pokemonAPIUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const fetchPokemonData = async (searchedPokemon) => {
    try{
        const neededPokemonUrl = pokemonAPIUrl + searchedPokemon;
        const res = await fetch(neededPokemonUrl);
        console.log(res)
        const data = await res.json();
        usePokemonData(data)
    }
    catch (error){
        alert("Pokémon not found");
    }
}

const usePokemonData  = (pokemonData) => {
    const {height, id, name, sprites, stats, types, weight} = pokemonData;
    pokemonName.textContent = name.toUpperCase();
    pokemonHeight.textContent = `Height: ${height}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonId.textContent = `#${id}`;
    imgElement.src = `${sprites.front_default}`;
    for (let i = 0; i < stats.length; i++) {
        const statNumber = stats[i].base_stat;
        const baseStat = stats[i].stat.name;
        document.getElementById(baseStat).textContent = statNumber;
    }
    typesContainer.textContent = "";
    for (let i = 0; i < types.length; i++) {
        const pokemonType = types[i].type.name;
        const divType = document.createElement("div");
        divType.classList.add("type",pokemonType);
        divType.textContent = pokemonType.toUpperCase();
        typesContainer.appendChild(divType)
    }
};

searchButton.addEventListener("click", () => {
    const searchedPokemon = searchInput.value.toLowerCase();
    if (searchedPokemon.length === 0) {
        alert("Enter a valid Pokémon");
    } else {
        fetchPokemonData(searchedPokemon)
    }
});

import type { CLICommand, State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string): Promise<void> {
  const pokemon = await state.pokeApi.fetchPokemon(pokemonName);
  if(pokemon !== undefined ) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const base_experience = pokemon.base_experience;
    console.log(`${pokemonName} base experience = ${base_experience}!`);
    const rando = Math.random();
    console.log(`Rando = ${rando}!`);
    if(rando >= 10 / base_experience) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex[pokemonName] = pokemon;
    } else {
        console.log(`${pokemonName} escaped!`);
    }
  } else {
    console.log("No Pokemon found.");
  }
}
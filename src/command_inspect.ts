import type { CLICommand, State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> {
    try {
        const pokemon = await state.pokeApi.inspectPokemon(pokemonName);
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.name}`);
        console.log(`Weight: ${pokemon.name}`);
        console.log("Stats:");
        pokemon.stats.forEach(stat => console.log(` -${stat.stat.name}: ${stat.base_stat}`))
        console.log("Types:");
        pokemon.types.forEach(item => console.log(` -${item.type.name}`))

    } catch (err) {
        console.log(`You have not caught ${pokemonName} yet!`);
    }
}
import type { CLICommand, State } from "./state.js";

export async function commandExplore(state: State, area: string): Promise<void> {
  console.log(`Exploring ${area}...`);
  const areaEncounters = await state.pokeApi.fetchAreaEncounters(area);
  if(areaEncounters !== undefined && areaEncounters.pokemon_encounters.length !== 0) {
    console.log("Found Pokemon:")
    areaEncounters.pokemon_encounters.forEach(encounter => console.log(` - ${encounter.pokemon.name}`));
  } else {
    console.log("No Pokemon found.");
  }
}
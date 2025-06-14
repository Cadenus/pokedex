import type { CLICommand, State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
  if(state.prevLocationsURL === null || state.prevLocationsURL === "") {
    console.log("you're on the first page");
    return;
  }
  const locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);
  state.nextLocationsURL = locations.next ?? "";
  state.prevLocationsURL = locations.previous ?? "";
  locations.results.forEach(location => console.log(location.name) );
}
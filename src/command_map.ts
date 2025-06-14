import type { CLICommand, State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  if(!state.firstRun && (state.nextLocationsURL === null || state.nextLocationsURL === "")) {
    console.log("you're on the last page");
    return;
  }
  const locations = await state.pokeApi.fetchLocations(state.nextLocationsURL);
  state.nextLocationsURL = locations.next ?? "";
  state.prevLocationsURL = locations.previous ?? "";
  locations.results.forEach(location => console.log(location.name) );

}
import type { CLICommand, State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log("");
  Object.values(state.commands).forEach(command => {
    console.log(`${command.name}: ${command.description}`);
  });
}
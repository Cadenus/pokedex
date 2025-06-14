import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapb } from "./command_mapb.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  firstRun: boolean;
}

export function initState(): State {
  const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > "
});
  const commands: Record<string, CLICommand> = getCommands();
  const result: State = {
    rl: readLine,
    commands: commands,
    pokeApi: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "",
    firstRun: true,
  }
  return result;
}

export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: "map",
      description: "Get next map location areas in the Pokemon world",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Get previous map location areas in the Pokemon world",
      callback: commandMapb,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the pokedex",
      callback: commandExit,
    },
  }
}
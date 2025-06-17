import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  firstRun: boolean;
  pokedex: Record<string, Pokemon>;
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
    pokedex: {},
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
    explore: {
      name: "explore",
      description: "Explore a location area by name in the Pokemon world",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch a Pokemon by name",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a caught(!) Pokemon by name",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Print the Pokedex",
      callback: commandPokedex,
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
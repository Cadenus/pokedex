import { createInterface } from "node:readline";
import type { CLICommand, State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ");
}

export function startREPL(state: State):void {
  state.rl.prompt();
  state.rl.on("line", async (input) => {
    await replCallback(state, input);
    state.rl.prompt();
  }
  );
}

async function replCallback(state: State, input: string): Promise<void> {
  const cleanedInput: string[] = cleanInput(input);
  if(cleanedInput.length === 0) {
    state.rl.prompt();
    return;
  } 
  try {
    const command = state.commands[cleanedInput[0]];
    if(command !== undefined) {
      const commandString = cleanedInput.shift();
      if(cleanedInput === undefined) {
        console.log(`Calling [${commandString}]`);
        await command.callback(state);
      } else {
        console.log(`Calling [${commandString}]`);
        cleanedInput.forEach(line => console.log(`Line: ${line}`));
        await command.callback(state, ...cleanedInput);
      }
    } else {
      throw new Error("Unknown command");
    }
  } catch(err) {
    if(err instanceof Error) {
      console.log(err.message); 
    } else {
      console.log("Unknown Error occurred"); 
    }
  }
}
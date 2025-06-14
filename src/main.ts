import { startREPL } from "./repl.js"
import { initState } from "./state.js";

function main() {
  const initalState = initState();
  startREPL(initalState);
}

main();
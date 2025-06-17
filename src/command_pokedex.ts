import type { CLICommand, State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
        const pokedex = await state.pokedex;
        console.log("Your Pokedex:");
        Object.entries(pokedex).forEach(([key, value]) => console.log(` - ${key}`));
}
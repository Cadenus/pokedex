import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  #cache: Cache;
  constructor() {
    this.#cache = new Cache(10000);
  }
  
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullURL = PokeAPI.baseURL + "/location-area";
    if(pageURL !== undefined && pageURL !== null && pageURL !== "") {
      fullURL = pageURL;
    }
    const cacheEntry = this.#cache.get(fullURL);
    if(cacheEntry !== undefined) {
      return cacheEntry;
    }
    try {      
      const response = await fetch( fullURL, {
      method: "GET",
      mode: "cors",
    });
    if(response.ok) {
      const data: ShallowLocations = await response.json();

      this.#cache.add(fullURL, data);
      return data;
    } else {
      throw Error(`Response was not ok: ${response.status}`);
    }   
  } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
        return Promise.reject(error);
      } else {
        return Promise.reject("MEEEEEH");
      }
    }
  }

  async fetchAreaEncounters(locationName: string): Promise<AreaEncounters> {    
    let fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cacheEntry = this.#cache.get(fullURL);
    if(cacheEntry !== undefined) {
      return cacheEntry;
    }
    try {      
      const response = await fetch( fullURL, {
      method: "GET",
      mode: "cors",
    });
    if(response.ok) {
      const encounterData: AreaEncounters = await response.json();
      this.#cache.add(fullURL, encounterData);
      return encounterData;
    } else {
      throw Error(`Response was not ok: ${response.status}`);
    }   
  } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
        return Promise.reject(error);
      } else {
        return Promise.reject("MEEEEEH");
      }
    }
  }
  
  async fetchPokemon(pokemonName: string): Promise<Pokemon> {    
    let fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cacheEntry = this.#cache.get(fullURL);
    if(cacheEntry !== undefined) {
      return cacheEntry;
    }
    try {      
      const response = await fetch( fullURL, {
      method: "GET",
      mode: "cors",
    });
    if(response.ok) {
      const pokemon: Pokemon = await response.json();
      this.#cache.add(fullURL, pokemon);
      return pokemon;
    } else {
      throw Error(`Response was not ok: ${response.status}`);
    }   
  } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
        return Promise.reject(error);
      } else {
        return Promise.reject("MEEEEEH");
      }
    }
  }

  async inspectPokemon(pokemonName: string): Promise<Pokemon> {    
    let fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cacheEntry = this.#cache.get(fullURL);
    if(cacheEntry !== undefined) {
      return Promise.resolve(cacheEntry);
    } else {
      return Promise.reject("Pokemon not caught!");
    }
  }
}


export type ShallowLocations = {
  count: number,
  next: string | null;
  previous: string | null;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};

export type AreaEncounters = {
  encounter_method_rates: Array<{
    encounter_method: {
      name: string
      url: string
    }
    version_details: Array<{
      rate: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  game_index: number
  id: number
  location: {
    name: string
    url: string
  }
  name: string
  names: Array<{
    language: {
      name: string
      url: string
    }
    name: string
  }>
  pokemon_encounters: Array<{
    pokemon: {
      name: string
      url: string
    }
    version_details: Array<{
      encounter_details: Array<{
        chance: number
        condition_values: Array<any>
        max_level: number
        method: {
          name: string
          url: string
        }
        min_level: number
      }>
      max_chance: number
      version: {
        name: string
        url: string
      }
    }>
  }>
}

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string
      url: string
    };
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number;
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  sprites: Object;
  versions: Object;
  cries: {
    latest: string;
    legacy: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  past_types: Array<{
    generation: {
      name: string;
      url: string;
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }>;
  }>;
  past_abilities: Array<{
    generation: {
      name: string;
      url: string;
    };
    abilities: Array<{
      ability: any
      is_hidden: boolean
      slot: number;
    }>;
  }>;
};
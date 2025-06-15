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
    console.log(`Requested Cache for ${fullURL}. Result is [${cacheEntry}]`);
    if(cacheEntry !== undefined) {
      console.log(`Cache hit for ${fullURL}`);
      return cacheEntry;
    }
    try {      
      console.log(`No Cache found for ${fullURL}. Making network request now`);
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
      console.log("MEEEEEH!");   
      return Promise.reject("MEEEEEH");
    }
  }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    return Promise.reject("Nope");
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
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullURL = PokeAPI.baseURL + "/location-area";
    if(pageURL !== undefined && pageURL !== null && pageURL !== "") {
      fullURL = pageURL;
    }
    try {
    const response = await fetch( fullURL, {
      method: "GET",
      mode: "cors",
    });
    if(response.ok) {
      const data: ShallowLocations = await response.json();
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
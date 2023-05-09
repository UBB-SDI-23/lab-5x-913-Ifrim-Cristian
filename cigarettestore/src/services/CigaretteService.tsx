import { Cigarette } from "../models/cigarette";
import { BACKEND_API_URL, CIGARETTES_URL } from "../utils/endpoints";

export class CigaretteService {
  getAllCigarettes = async (): Promise<Cigarette[]> => {
    const response = await fetch(BACKEND_API_URL + CIGARETTES_URL);
    return await response.json();
  };

  getCigarette = async (id: number): Promise<Cigarette> => {
    const response = await fetch(BACKEND_API_URL + CIGARETTES_URL + "/" + id);
    return await response.json();
  };

  postCigarette = async (cigarette: Cigarette) => {
    const response = await fetch(BACKEND_API_URL + CIGARETTES_URL, {
      method: "POST",
    });

    return await response.json();
  };
  putCigarette = async (id: number, cigarette: Cigarette) => {
    const response = await fetch(BACKEND_API_URL + CIGARETTES_URL + "/" + id, {
      method: "PUT",
    });

    return await response.json();
  };
  deleteCigarette = async (id: number) => {
    const response = await fetch(BACKEND_API_URL + CIGARETTES_URL + "/" + id, {
      method: "DELETE",
    });

    return await response.json();
  };
}

import { Cigarette } from "../models/cigarette";
import { BACKEND_API_URL, CIGARETTES_URL } from "../utils/endpoints";

export class CigaretteService {
  getPageCount = async (pageSize: number): Promise<number> => {
    const response = await fetch(
      BACKEND_API_URL + CIGARETTES_URL + "/pageCount?pageSize=" + pageSize
    );
    return await response.json();
  };

  getAllCigarettes = async (
    page: number,
    pageSize: number
  ): Promise<Cigarette[]> => {
    const response = await fetch(
      BACKEND_API_URL +
        CIGARETTES_URL +
        "?page=" +
        page +
        "&pageSize=" +
        pageSize
    );
    return await response.json();
  };

  getCigarette = async (id: number): Promise<Cigarette> => {
    const response = await fetch(BACKEND_API_URL + CIGARETTES_URL + "/" + id);
    return await response.json();
  };

  postCigarette = async (
    brand: number,
    model: string,
    type: string,
    heated: boolean,
    nicotineQuantity: number,
    price: number
  ) => {
    const response = await fetch(BACKEND_API_URL + CIGARETTES_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brandId: brand,
        model: model,
        type: type,
        isHeated: heated,
        nicotineQuantity: nicotineQuantity,
        price: price,
      }),
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

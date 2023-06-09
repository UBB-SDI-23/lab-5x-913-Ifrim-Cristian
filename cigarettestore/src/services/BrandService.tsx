import { Brand } from "../models/brand";
import { BACKEND_API_URL, BRANDS_URL } from "../utils/endpoints";

export class BrandService {
  getPageCount = async (pageSize: number): Promise<number> => {
    const response = await fetch(
      BACKEND_API_URL + BRANDS_URL + "/pageCount?pageSize=" + pageSize
    );
    return await response.json();
  };

  getAllBrands = async (page: number, pageSize: number): Promise<Brand[]> => {
    const response = await fetch(
      BACKEND_API_URL + BRANDS_URL + "?page=" + page + "&pageSize=" + pageSize
    );
    return await response.json();
  };

  getBrandsByName = async (name: string): Promise<Brand[]> => {
    console.log(BACKEND_API_URL + BRANDS_URL + "?name=" + name);
    const response = await fetch(
      BACKEND_API_URL + BRANDS_URL + "?name=" + name
    );
    return await response.json();
  };

  getBrand = async (id: number): Promise<Brand> => {
    const response = await fetch(BACKEND_API_URL + BRANDS_URL + "/" + id);
    return await response.json();
  };

  postBrand = async (
    name: string,
    description: string,
    country: string,
    year: number,
    logo: string
  ) => {
    const response = await fetch(BACKEND_API_URL + BRANDS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        country: country,
        year: year,
        logo: logo,
      }),
    });

    return await response.json();
  };
  putBrand = async (id: number, Brand: Brand) => {
    const response = await fetch(BACKEND_API_URL + BRANDS_URL + "/" + id, {
      method: "PUT",
    });

    return await response.json();
  };
  deleteBrand = async (id: number) => {
    const response = await fetch(BACKEND_API_URL + BRANDS_URL + "/" + id, {
      method: "DELETE",
    });

    return await response.json();
  };

  getBrandNicotineStatistics = async (page: number, pageSize: number) => {
    const response = await fetch(
      BACKEND_API_URL +
        BRANDS_URL +
        "/nicotine-statistics?page=" +
        page +
        "&pageSize=" +
        pageSize
    );

    return await response.json();
  };

  getBrandPriceStatistics = async (page: number, pageSize: number) => {
    const response = await fetch(
      BACKEND_API_URL +
        BRANDS_URL +
        "/price-statistics?page=" +
        page +
        "&pageSize=" +
        pageSize
    );
    
    return await response.json();
  };
}

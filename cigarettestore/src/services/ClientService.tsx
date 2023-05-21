import { Client } from "../models/client";
import { BACKEND_API_URL, CLIENTS_URL } from "../utils/endpoints";

export class ClientService {
  getPageCount = async (pageSize: number): Promise<number> => {
    const response = await fetch(
      BACKEND_API_URL + CLIENTS_URL + "/pageCount?pageSize=" + pageSize
    );
    return await response.json();
  };

  getAllClients = async (page: number, pageSize: number): Promise<Client[]> => {
    const response = await fetch(
      BACKEND_API_URL + CLIENTS_URL + "?page=" + page + "&pageSize=" + pageSize
    );
    return await response.json();
  };

  getClient = async (id: number): Promise<Client> => {
    const response = await fetch(BACKEND_API_URL + CLIENTS_URL + "/" + id);
    return await response.json();
  };

  postClient = async (
    firstName: string,
    secondName: string,
    email: string,
    dateOfBirth: Date | null,
    password: string
  ) => {
    const response = await fetch(BACKEND_API_URL + CLIENTS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        secondName: secondName,
        email: email,
        dateOfBirth: dateOfBirth,
        password: password,
      }),
    });

    return await response.json();
  };
  putClient = async (id: number, Client: Client) => {
    const response = await fetch(BACKEND_API_URL + CLIENTS_URL + "/" + id, {
      method: "PUT",
    });

    return await response.json();
  };
  deleteClient = async (id: number) => {
    const response = await fetch(BACKEND_API_URL + CLIENTS_URL + "/" + id, {
      method: "DELETE",
    });

    return await response.json();
  };
}

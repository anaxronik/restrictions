import { country } from "@prisma/client";
const headers = { "Content-Type": "application/json" };

const getCountries = (): Promise<country[]> =>
  fetch("/api/countries").then((res) => res.json());
const createCountry = (data: Omit<country, "id">): Promise<country> =>
  fetch("/api/countries", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
const removeCountry = (id: string): Promise<country> =>
  fetch(`/api/countries/${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => res.json());

export const API = {
  countries: {
    getCountries,
    createCountry,
    removeCountry,
  },
};

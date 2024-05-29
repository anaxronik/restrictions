import { TCreateCityBody } from "@/app/api/cities/route";
import { TSearchCountryBody } from "@/app/api/countries/search/route";
import {
  TSearchRestrictionsRequestBody,
  TSearchRestrictionsResponseBody,
} from "@/app/api/restrictions/search/route";
import { City, Country, Restriction } from "@prisma/client";
const headers = { "Content-Type": "application/json" };

const getCountries = (): Promise<Country[]> =>
  fetch("/api/countries").then((res) => res.json());
const createCountry = (data: Omit<Country, "id">): Promise<Country> =>
  fetch("/api/countries", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
const searchCountry = (data: TSearchCountryBody): Promise<Country[]> =>
  fetch("/api/countries/search", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
const removeCountry = (id: string): Promise<Country> =>
  fetch(`/api/countries/${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => res.json());

export type CityWithCountry = City & {
  country: Country;
};

const getCities = (): Promise<CityWithCountry[]> =>
  fetch("/api/cities").then((res) => res.json());

const createCity = (data: TCreateCityBody): Promise<City> =>
  fetch("/api/cities", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());

const removeCity = (id: string): Promise<Country> =>
  fetch(`/api/cities/${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => res.json());

const getAllRestrictions = (): Promise<Restriction[]> =>
  fetch("/api/restrictions").then((res) => res.json());

const searchRestrictions = (
  data: TSearchRestrictionsRequestBody
): Promise<TSearchRestrictionsResponseBody[]> =>
  fetch("/api/restrictions/search", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());

const createRes = (data: TCreateCityBody): Promise<City> =>
  fetch("/api/cities", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const API = {
  countries: {
    getCountries,
    createCountry,
    removeCountry,
    searchCountry,
    getCities,
    createCity,
    removeCity,
  },
  restrictions: {
    getAllRestrictions,
    searchRestrictions,
  },
};

export enum QueryKeys {
  getCountries,
  createCountry,
  removeCountry,
  searchCountry,
  getCities,
  createCity,
  removeCity,
  getAllRestrictions,
  searchRestrictions,
}

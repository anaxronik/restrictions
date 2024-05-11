"use client";

import APIS from "@/api";
import { CountryEntity } from "@/api/api/api";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useState } from "react";

type Props = {
  onSelectCountry?: (value: TCountry) => void;
};

interface TCountry extends CountryEntity {}

export default function FindCountry(props: Props) {
  const [selectedCountry, setSelectedCountry] = useState<TCountry | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<TCountry[]>([]);

  const search = ({ query }: AutoCompleteCompleteEvent) => {
    const name = String(query).trim().toLowerCase();
    if (!name) return;
    APIS.api
      .countriesControllerFind({
        name,
      })
      .then(({ data }) => {
        setFilteredCountries(data);
      })
      .catch(() => {
        setFilteredCountries([]);
      });
  };

  return (
    <span className="p-float-label">
      <AutoComplete
        field="name"
        value={selectedCountry}
        suggestions={filteredCountries}
        completeMethod={search}
        onChange={({ value }) => {
          setSelectedCountry(value);
          props.onSelectCountry?.(value);
        }}
        inputId="ac"
        placeholder="Страна"
      />
      <label htmlFor="ac">Поиск страны</label>
    </span>
  );
}

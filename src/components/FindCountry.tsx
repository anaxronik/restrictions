"use client";

import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useState } from "react";

type Props = {
  onSelectCountry?: (value: TCountry) => void;
};

interface TCountry {}

export default function FindCountry(props: Props) {
  const [selectedCountry, setSelectedCountry] = useState<TCountry | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<TCountry[]>([]);

  const search = ({ query }: AutoCompleteCompleteEvent) => {
    console.log("search");

    const name = String(query).trim().toLowerCase();

    if (name) {
    } else {
    }
  };

  return (
    <span className="p-float-label w-full">
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
        dropdown
      />
      <label htmlFor="ac">Поиск страны</label>
    </span>
  );
}

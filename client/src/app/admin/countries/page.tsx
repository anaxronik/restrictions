"use client";
import APIS from "@/api";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export default function CountriesPage() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    APIS.api.countriesControllerFindAll().then((res) => {
      console.log({ res });
    });

    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <div className={""}>
      <div>{value}</div>
      <Button
        label="add"
        onClick={() => {
          setValue((prev) => prev + 1);
        }}
      />
    </div>
  );
}

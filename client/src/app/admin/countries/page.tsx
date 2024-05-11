"use client";
import { Button } from "primereact/button";
import { useState } from "react";

export default function CountriesPage() {
  const [value, setValue] = useState(0);

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

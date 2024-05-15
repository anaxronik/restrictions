"use client";

import FindCountry from "@/components/FindCountry";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function CountriesPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [name, setName] = useState("");
  const toast = useRef<Toast>(null);

  const updateCountries = () => {};

  useEffect(() => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
      });
  }, []);

  return (
    <div className={"flex flex-column gap-4"}>
      <Toast ref={toast} />

      <FindCountry
        onSelectCountry={(a) => {
          console.log(a);
        }}
      />

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit");
          }}
        >
          <InputText value={name} onChange={(e) => setName(e.target.value)} />
        </form>
      </div>

      <DataTable
        value={countries}
        scrollable
        scrollHeight="400px"
        virtualScrollerOptions={{ itemSize: 46 }}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="name"
          header="Название страны"
          style={{
            width: "100%",
          }}
        ></Column>
        <Column
          body={(row: any) => {
            return (
              <Button
                icon={<i className="pi pi-trash"></i>}
                onClick={() => {}}
                type="button"
                text
                severity="danger"
              />
            );
          }}
        ></Column>
      </DataTable>
    </div>
  );
}

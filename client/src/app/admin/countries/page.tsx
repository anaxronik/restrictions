"use client";
import APIS from "@/api";
import { CountryEntity } from "@/api/api/api";
import FindCountry from "@/components/FindCountry";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function CountriesPage() {
  const [countries, setCountries] = useState<CountryEntity[]>([]);
  const [name, setName] = useState("");
  const toast = useRef<Toast>(null);

  const updateCountries = () => {
    return APIS.api
      .countriesControllerFindAll()
      .then((res) => {
        setCountries(res.data);
      })
      .catch(() => {
        setCountries([]);
      });
  };

  useEffect(() => {
    updateCountries();
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
            APIS.api
              .countriesControllerCreate({ name })
              .then(() => {
                setName("");
              })
              .catch((err: any) => {
                console.log({ err });

                toast.current?.show({
                  severity: "error",
                  summary: err?.response?.data?.message,
                  detail: err?.response?.data?.message,
                  life: 3000,
                });
              })
              .finally(() => {
                updateCountries();
              });
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
          body={(row: CountryEntity) => {
            return (
              <Button
                icon={<i className="pi pi-trash"></i>}
                onClick={() => {
                  APIS.api
                    .countriesControllerRemove(row.id)
                    .then(updateCountries);
                }}
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

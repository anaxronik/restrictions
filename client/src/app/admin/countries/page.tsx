"use client";
import APIS from "@/api";
import { CountryEntity } from "@/api/api/api";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

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
    <div className={""}>
      <Toast ref={toast} />
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
      <div className="flex flex-column">
        {countries.map((c) => {
          return (
            <div key={c.id}>
              <span>{c.name}</span>
              <span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    APIS.api.countriesControllerRemove(c.id).then(() => {
                      updateCountries();
                    });
                  }}
                >
                  delete
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

import { API } from "@/api/api";
import CreateCountryForm from "@/components/CreateCountryForm/CreateCountryForm";
import { queryClient } from "@/components/ReactQueryProvider";
import { Country } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function CountriesPage() {
  const [selectedProducts, setSelectedProducts] = useState<Country[]>([]);
  const toast = useRef<Toast>(null);
  const query = useQuery<Country[]>({
    queryKey: ["getCountries"],
    queryFn: API.countries.getCountries,
    refetchOnMount: false,
  });

  return (
    <div className={"flex flex-column gap-4"}>
      <Toast ref={toast} />

      <CreateCountryForm />

      <DataTable
        size="small"
        value={query.data}
        scrollable
        scrollHeight="40vw"
        virtualScrollerOptions={{ itemSize: 32 }}
        tableStyle={{ minWidth: "20rem" }}
        loading={query.isFetching}
        selectionMode="checkbox"
        selection={selectedProducts}
        onSelectionChange={(e) => {
          console.log("onSelectionChange", e.value);

          setSelectedProducts(e.value);
        }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="name"
          header={`Название страны (${query.data?.length || ""})`}
          style={{
            width: "100%",
          }}
        ></Column>
        <Column body={(row) => <RemoveButton id={row.id} />}></Column>
      </DataTable>
    </div>
  );
}

function RemoveButton(props: { id: string }) {
  const mutation = useMutation({
    mutationFn: API.countries.removeCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCountries"] });
    },
  });
  return (
    <Button
      icon={<i className="pi pi-trash"></i>}
      onClick={() => {
        mutation.mutate(props.id);
      }}
      type="button"
      text
      severity="danger"
      loading={mutation.isPending}
    />
  );
}

import { API, CityWithCountry, QueryKeys } from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { queryClient } from "./ReactQueryProvider";

const CitiesList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  const query = useQuery<CityWithCountry[]>({
    queryKey: [QueryKeys.getCities],
    queryFn: API.countries.getCities,
    refetchOnMount: false,
  });

  return (
    <div>
      <DataTable
        size="small"
        value={query.data}
        scrollable
        scrollHeight="40vw"
        virtualScrollerOptions={{ itemSize: 32 }}
        tableStyle={{ minWidth: "20rem" }}
        loading={query.isFetching}
      >
        <Column
          field="name"
          header={`Город`}
          // style={{
          //   width: "100%",
          // }}
        ></Column>
        <Column
          field="country"
          header={`Страна`}
          body={(row) => row.country.name}
        ></Column>
        <Column body={(row) => <RemoveButton id={row.id} />}></Column>
      </DataTable>
      <Paginator
        first={first}
        rows={searchParams.get("rows") ? Number(searchParams.get("rows")) : 10}
        totalRecords={120}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={(e) => {
          console.log("onPageChange", e);
          console.log("searchParams", searchParams.get("rows"));
          const params = new URLSearchParams(searchParams);
          const term = "12";
          Object.entries(e).forEach(([key, value]) => {
            if (value) {
              params.set(key, String(value));
            } else {
              params.delete(key);
            }
          });

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </div>
  );
};

export default CitiesList;

function RemoveButton(props: { id: string }) {
  const mutation = useMutation({
    mutationFn: API.countries.removeCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.getCities] });
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

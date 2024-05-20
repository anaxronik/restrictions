import { API, CityWithCountry, QueryKeys } from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { queryClient } from "./ReactQueryProvider";

const CitiesList = () => {
  const query = useQuery<CityWithCountry[]>({
    queryKey: [QueryKeys.getCities],
    queryFn: API.countries.getCities,
    refetchOnMount: false,
  });

  return (
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
  );
};

export default CitiesList;

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

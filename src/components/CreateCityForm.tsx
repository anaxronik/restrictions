import { API, QueryKeys } from "@/api/api";
import { useSearchCountryRequest } from "@/hooks/requests/useSearchCountryRequest";
import { Country } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { queryClient } from "./ReactQueryProvider";

type Inputs = {
  country: Country;
  name: string;
};

const CreateCityForm = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const searchCountry = useSearchCountryRequest({ onSuccess: setCountries });
  const createCity = useMutation({
    mutationFn: API.countries.createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.getCities] });
    },
  });

  const { handleSubmit, control } = useForm<Inputs>({
    // reValidateMode: "onBlur",
    // mode: "onChange",
    disabled: createCity.isPending,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createCity.mutate({
      name: data.name,
      countryId: data.country.id,
    });
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Обязательно",
        }}
        render={(renderProps) => {
          return (
            <div className="flex flex-column gap-1 flex-1">
              <FloatLabel>
                <label htmlFor="name">Название города</label>
                <InputText
                  className="w-full"
                  id="name"
                  aria-describedby="username-help"
                  {...renderProps.field}
                  // disabled={mutation.isPending}
                  autoFocus
                />
              </FloatLabel>
              {renderProps.fieldState.error && (
                <small className="pl-2" id="username-help">
                  {renderProps.fieldState.error.message}
                </small>
              )}
            </div>
          );
        }}
      />
      <Controller
        name="country"
        control={control}
        rules={{
          required: "Обязательно",
        }}
        render={(renderProps) => {
          return (
            <div className="flex flex-column gap-1 flex-1 w-full">
              <FloatLabel>
                <label htmlFor="country">Страна</label>
                <AutoComplete
                  {...renderProps.field}
                  id="country"
                  className="w-full flex-1"
                  suggestions={countries}
                  completeMethod={(e) =>
                    searchCountry.mutate({ name: e.query })
                  }
                  field="name"
                />
              </FloatLabel>
              {renderProps.fieldState.error && (
                <small className="pl-2" id="username-help">
                  {renderProps.fieldState.error.message}
                </small>
              )}
            </div>
          );
        }}
      />
      <div>
        <Button label="Создать" type="submit" />
      </div>
    </form>
  );
};

export default CreateCityForm;

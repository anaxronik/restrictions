import { API } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { queryClient } from "../ReactQueryProvider";

type Props = {};

type Inputs = {
  name: string;
};

const CreateCountryForm = (props: Props) => {
  const mutation = useMutation({
    mutationFn: API.countries.createCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCountries"] });
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
    reValidateMode: "onBlur",
    mode: "onChange",
    disabled: mutation.isPending,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data as any);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
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
                  <label htmlFor="name">Название страны</label>
                  <InputText
                    className="w-full"
                    id="name"
                    aria-describedby="username-help"
                    {...renderProps.field}
                    // disabled={mutation.isPending}
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
          <Button label="Создать" type="submit" loading={mutation.isPending} />
        </div>
      </div>
    </form>
  );
};

export default CreateCountryForm;

import { useCreateRestrictionRequest } from "@/hooks/requests/useCreateRestrictionRequest";
import { useSearchCountryRequest } from "@/hooks/requests/useSearchCountryRequest";
import {
  BorderCrossingType,
  CargoType,
  ContragentType,
  Country,
} from "@prisma/client";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputAutocomplete from "./inputs/InputAutocomplete";

type Props = {};
type Inputs = {
  countries: Country[];
  borderCrossingType: BorderCrossingType[];
  senderType: ContragentType[];
  receiverType: ContragentType[];
  cargoType: CargoType[];
  comment: string;
};
export type TSelectButtonOption<T = any> = {
  name: string;
  value: T;
};

export const borderCrossingTypes: TSelectButtonOption<BorderCrossingType>[] = [
  { name: "Экспорт", value: "EXPORT" },
  { name: "Импорт", value: "IMPORT" },
  { name: "Внутренний", value: "INSIDE" },
];

export const contragentTypes: TSelectButtonOption<ContragentType>[] = [
  { name: "Физическое лицо", value: "INDIVIDUAL" },
  { name: "Юридическое лицо", value: "LEGAL" },
];
export const cargoTypes: TSelectButtonOption<CargoType>[] = [
  { name: "Груз", value: "CARGO" },
  { name: "Документ", value: "DOCUMENTS" },
];

const CreateRestrictions = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const createRestrictions = useCreateRestrictionRequest();
  const searchCountry = useSearchCountryRequest({ onSuccess: setCountries });

  const { handleSubmit, control } = useForm<Inputs>({
    // reValidateMode: "onBlur",
    // mode: "onChange",
    // disabled: createCity.isPending,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    createRestrictions.mutate({
      filter: {
        countries: data.countries?.map((c) => c.id) || [],
        borderCrossingType: data.borderCrossingType || [],
        cargoType: data.cargoType || [],
        receiverType: data.receiverType || [],
        senderType: data.receiverType || [],
      },
      data: {
        comment: data.comment || undefined,
      },
    });
  };

  return (
    <form className="grid" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-12">
        <Controller
          name="countries"
          control={control}
          rules={
            {
              // required: "Обязательно",
            }
          }
          render={(args) => (
            <InputAutocomplete
              {...args}
              multiple
              label="Страна"
              suggestions={countries}
              completeMethod={(e) => searchCountry.mutate({ name: e.query })}
              suggestionValueKey="name"
            />
          )}
        />
      </div>
      <div className="col-6">
        <Controller
          name="borderCrossingType"
          control={control}
          render={(args) => (
            <div className="flex flex-column gap-1">
              <label className="pl-2" htmlFor="borderCrossingType">
                Тип пересечения границы
              </label>
              <SelectButton
                value={args.field.value}
                onChange={(e: SelectButtonChangeEvent) => {
                  args.field.onChange(e.value);
                }}
                optionLabel="name"
                options={borderCrossingTypes}
                multiple
                id="borderCrossingType"
              />
            </div>
          )}
        />
      </div>
      <div className="col-6">
        <Controller
          name="cargoType"
          control={control}
          render={(args) => (
            <div className="flex flex-column gap-1">
              <label className="pl-2" htmlFor="cargoType">
                Тип груза
              </label>
              <SelectButton
                value={args.field.value}
                onChange={(e: SelectButtonChangeEvent) => {
                  args.field.onChange(e.value);
                }}
                optionLabel="name"
                options={cargoTypes}
                multiple
                id="cargoType"
              />
            </div>
          )}
        />
      </div>

      <div className="col-6">
        <Controller
          name="senderType"
          control={control}
          render={(args) => (
            <div className="flex flex-column gap-1">
              <label className="pl-2" htmlFor="senderType">
                Тип отправителя
              </label>
              <SelectButton
                value={args.field.value}
                onChange={(e: SelectButtonChangeEvent) => {
                  args.field.onChange(e.value);
                }}
                optionLabel="name"
                options={contragentTypes}
                multiple
                id="senderType"
              />
            </div>
          )}
        />
      </div>
      <div className="col-6">
        <Controller
          name="receiverType"
          control={control}
          render={(args) => (
            <div className="flex flex-column gap-1">
              <label className="pl-2" htmlFor="receiverType">
                Тип отправителя
              </label>
              <SelectButton
                value={args.field.value}
                onChange={(e: SelectButtonChangeEvent) => {
                  args.field.onChange(e.value);
                }}
                optionLabel="name"
                options={contragentTypes}
                multiple
                id="receiverType"
              />
            </div>
          )}
        />
      </div>
      <div className="col-12">
        <Controller
          name="comment"
          control={control}
          render={(args) => (
            <div className="flex flex-column gap-1">
              <label className="pl-2" htmlFor="comment">
                Комментарий
              </label>
              <InputTextarea
                autoResize
                value={args.field.value}
                onChange={(e) => {
                  args.field.onChange(e.target.value);
                }}
                rows={5}
                cols={30}
              />
            </div>
          )}
        />
      </div>
      <div className="col-12">
        <Button label="Создать" className="w-full" />
      </div>
    </form>
  );
};

export default CreateRestrictions;

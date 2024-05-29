import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { FloatLabel } from "primereact/floatlabel";
import React, { useId } from "react";

type Props = {
  field?: any;
  fieldState?: any;
  label?: React.ReactNode;
  completeMethod?: (e: AutoCompleteCompleteEvent) => void;
  suggestions?: any[];
  suggestionValueKey?: string;
  multiple?: boolean;
};

const InputAutocomplete = (props: Props) => {
  const id = useId();
  return (
    <div className="flex flex-column gap-1 flex-1 w-full">
      <FloatLabel>
        {props.label && <label htmlFor={id}>{props.label}</label>}
        <AutoComplete
          {...props.field}
          id={id}
          className="flex w-full flex-1"
          suggestions={props.suggestions}
          completeMethod={props.completeMethod}
          field={props.suggestionValueKey || "name"}
          multiple={props.multiple}
        />
      </FloatLabel>
      {props?.fieldState?.error && (
        <small className="pl-2" id={id + "-help"}>
          {props.fieldState.error.message}
        </small>
      )}
    </div>
  );
};

export default InputAutocomplete;

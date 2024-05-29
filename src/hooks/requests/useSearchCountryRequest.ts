import { API } from "@/api/api";
import { Country } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

type TParams = {
  onSuccess?: (countries: Country[]) => void;
};

export function useSearchCountryRequest(params?: TParams) {
  return useMutation({
    mutationFn: API.countries.searchCountry,
    onSuccess: params?.onSuccess,
  });
}

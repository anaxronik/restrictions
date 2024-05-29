import { TCreateRestrictionRequestBody } from "@/app/api/restrictions/route";
import { useMutation } from "@tanstack/react-query";

export function useCreateRestrictionRequest() {
  return useMutation({
    mutationFn: (data: TCreateRestrictionRequestBody): Promise<any> =>
      fetch("/api/restrictions", {
        method: "POST",
        // headers,
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    // onSuccess: params?.onSuccess,
  });
}

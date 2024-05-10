import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryCl = useQueryClient();
  const { mutate: cabinCreater, isLoading: isAdding } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryCl.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin Successfully Added!");
    },
    onError: () => {
      toast.error("Cabin Couldn't be Added!");
    },
  });
  return { cabinCreater, isAdding };
}

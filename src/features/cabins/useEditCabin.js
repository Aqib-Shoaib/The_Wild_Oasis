import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryCl = useQueryClient();
  const { mutate: cabinEditing, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryCl.invalidateQueries({
        queryKey: ["cabin"],
      });

      toast.success("Cabin Successfully updated!");
    },
    onError: () => {
      toast.error("Cabin Couldn't be Updated!");
    },
  });
  return { cabinEditing, isEditing };
}

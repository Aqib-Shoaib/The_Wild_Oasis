import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryCl = useQueryClient();
  const { mutate: cabinDeleter, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryCl.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin Succesfully deleted!");
    },
    onError: (err) => toast.error("Cabin couldn't deleted!", err.message),
  });
  return { cabinDeleter, isDeleting };
}

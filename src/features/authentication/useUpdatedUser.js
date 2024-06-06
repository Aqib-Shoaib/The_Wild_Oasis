import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiAuth";

export default function useUpdatedUser() {
  const queryCl = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      queryCl.invalidateQueries({
        queryKey: ["user"],
      });
      queryCl.setQueryData(["user"], user);
      toast.success("User data Successfully updated!");
    },
    onError: () => {
      toast.error("user data Couldn't be Updated!");
    },
  });
  return { updateUser, isUpdating };
}

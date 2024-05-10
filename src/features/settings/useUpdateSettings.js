import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      toast.success("Setting Successfully updated!");
    },
    onError: () => {
      toast.error("Setting Couldn't be Updated!");
    },
  });
  return { updateSettings, isLoading };
}

import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { isLoading, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => toast.success("Account Successfully created!"),
    onError: () => toast.error("Error in Adding a new user"),
  });

  return { isLoading, mutate };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const queryCl = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryCl.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { isLoading, mutate };
}

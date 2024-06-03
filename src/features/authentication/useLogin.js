import { useMutation, useQueryClient } from "@tanstack/react-query";
import login from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryCl = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      toast.success("Login Succesful!");
      queryCl.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("Login Failed!");
    },
  });

  return { isLoading, mutate };
}

export default useLogin;

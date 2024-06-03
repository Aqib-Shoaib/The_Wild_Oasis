import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { data, isLoading, isAuthenticated: data?.role === "authenticated" };
}

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const {
    isLoading: isRetrieving,
    data: settings = {},
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (error) {
    console.error("Error fetching settings:", error);
  }
  return { isRetrieving, settings };
}
export default useSettings;

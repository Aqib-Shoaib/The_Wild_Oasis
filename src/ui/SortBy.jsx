/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  const value = searchParams.get("sortBy") || "";
  return (
    <Select
      options={options}
      onChange={handleChange}
      type="white"
      value={value}
    />
  );
}

export default SortBy;

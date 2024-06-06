import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const {
    isLoading: isLoading1,
    data: bookingsData,
    numDays,
  } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays } = useRecentStays();
  const { isLoading: isLoading3, data: cabinData } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  const cabinLength = cabinData?.length;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookingsData}
        confirmedStays={confirmedStays}
        cabinLength={cabinLength}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookingsData} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

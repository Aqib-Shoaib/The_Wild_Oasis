/* eslint-disable react/prop-types */
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, cabinLength, numDays }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = confirmedStays.length;
  const occRate =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinLength)) *
    100;
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="No. of Bookings"
        color="blue"
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check-Ins"
        color="indigoBlue"
        value={checkIns}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        color="yellow"
        value={`${Math.round(occRate)}%`}
      />
    </>
  );
}

export default Stats;

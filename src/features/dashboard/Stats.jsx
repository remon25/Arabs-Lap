import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  booking,
  confirmedStays,
  numDays,
  cabinsCount,
}) {
  // 1.
  const numBooking = booking?.length;

  // 2.
  const sales = booking.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import { useGetCabins } from "../cabins/useGetCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../../features/check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading: isLodingBooking, booking = [] } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    confirmedStays = [],
    numDays,
  } = useRecentStays();
  const { cabins = [] } = useGetCabins();

  if (isLodingBooking || isLoadingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        booking={booking}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart booking={booking} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

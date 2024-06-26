import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useLapReportsActivity } from "../lab-report/useLapReportsActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function Today() {
  const { isLoading, lapReportsToday } = useLapReportsActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">تقارير مختبر اليوم</Heading>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : lapReportsToday?.length > 0 ? (
        <TodayList>
          {lapReportsToday.map((activity) => (
            <TodayItem
              key={activity.id}
              id={activity.id}
              writer={activity.sample_writer}
              link="lab-report"
            >
              {activity.sample_writer}
            </TodayItem>
          ))}
        </TodayList>
      ) : (
        <NoActivity>لا تقارير مختبر اليوم</NoActivity>
      )}
    </StyledToday>
  );
}

export default Today;

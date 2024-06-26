import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";

const StyledTodayItem = styled.li`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-300);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ writer,id,link }) {

  return (
    <StyledTodayItem>
      <Tag type="blue">{id}</Tag>
      <Guest>{writer}</Guest>
      <Button type="primary" size="small">
        <Link to={`/${link}/${id}`}>تفاصيل</Link>
      </Button>
    </StyledTodayItem>
  );
}

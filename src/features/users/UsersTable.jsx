import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchAllUsers } from "../../services/apiAuth.js";
import Spinner from "../../ui/Spinner.jsx";
import UserRow from "./UserRow.jsx";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
  @media screen and (max-width: 992px) {
    font-size: 0.8rem;
    
  }
  @media screen and (max-width: 480px) {
    column-gap: 0.5rem;
    padding: 1.6rem 1rem;

  }
`;

export default function UsersTable() {
  const {
    isLoading,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
  if (isLoading) return <Spinner />;
  return (
    <Table role="table">
      <TableHeader>
        <div></div>
        <div>الاسم</div>
        <div>البريد الالكتروني</div>
        <div></div>
        <div>الصورة</div>
        <div></div>
      </TableHeader>
      {[...users.users].reverse().map((user) => (
        <UserRow user={user} key={user.id}/>
      ))}
    </Table>
  );
}

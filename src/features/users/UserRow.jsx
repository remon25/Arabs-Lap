import styled from "styled-components";
import { getUserRole } from "../../services/apiAuth";

const Row = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
  &:nth-child(2) {
    border: 0.5px solid #f5ecbc;
    border-radius: 4px;
  }
  @media screen and (max-width: 480px) {
    column-gap: 0.5rem;
    padding: 1.6rem 1rem;

  }
`;
const Img = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export default function UserRow({ user }) {
  const image = user.user_metadata?.avatar || "/default-user.jpg";

  return (
    <Row type="horizontal">
      <div></div>
      <User>{user.user_metadata?.fullName}</User>
      <User>{user.email}</User>
      <div></div>
      <Img src={image} />
      <div>{getUserRole(user.id) === 1 ? "مدير" : "مستخدم"}</div>
    </Row>
  );
}

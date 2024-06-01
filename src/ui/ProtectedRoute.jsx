import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1 - load authenticated user

  const { user, isPending, isAuthenticated, fetchStatus } = useUser();

  // 2 - if not logged in, redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isPending && fetchStatus !== "fetching")
        navigate("/login");
    },
    [isAuthenticated, navigate, isPending]
  );
  // 3 - while loading show spiner

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4 -  if logged in, render children

  if (isAuthenticated) return children;
}

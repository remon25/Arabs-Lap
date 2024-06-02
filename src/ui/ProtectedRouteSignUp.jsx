import styled from "styled-components";
import { useRoles } from "../features/authentication/useGetRoles";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";


const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRouteSignUp({ children }) {
  const navigate = useNavigate();
  // 1 - load authenticated user

  const {isPending, isAdmin, fetchStatus } = useRoles();

  // 2 - if not logged in, redirect to login page
  useEffect(
    function () {
      if (!isAdmin && !isPending && fetchStatus !== "fetching") {
        toast.error('عفواً،ليس لديك صلاحيات', {
          id: 'permission-denied',
        });
        navigate("/");
      }
    },
    [isAdmin, navigate, isPending, fetchStatus]
  );
  // 3 - while loading show spiner

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4 -  if logged in, render children

  if (isAdmin) return children;
}

import UsersTable from "../features/users/UsersTable";
import ProtcetedRouteRoles from "../ui/ProtectedRouteRoles";

export default function UsersList() {
  return (
    <ProtcetedRouteRoles>
    <div>
      <UsersTable />
    </div>
    </ProtcetedRouteRoles>
  );
}

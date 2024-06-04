import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import ProtectedRouteRoles from "../ui/ProtectedRouteRoles";
function NewUsers() {
  return (
    <>
      <ProtectedRouteRoles>
        <Heading as="h1">انشئ مستخدم جديد</Heading>
        <SignupForm />
      </ProtectedRouteRoles>
    </>
  );
}

export default NewUsers;

import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import ProtectedRouteSignUp from "../ui/ProtectedRouteSignUp";
function NewUsers() {
  return (
    <>
      <ProtectedRouteSignUp>
        <Heading as="h1">انشئ مستخدم جديد</Heading>
        <SignupForm />
      </ProtectedRouteSignUp>
    </>
  );
}

export default NewUsers;

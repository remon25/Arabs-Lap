import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">حدث بيانات حسابك</Heading>

      <Row>
        <Heading as="h3">تحديث بيانات الحساب</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">تغيير كلمة المرور</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;

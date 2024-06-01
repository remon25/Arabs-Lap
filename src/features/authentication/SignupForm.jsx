import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="الأسم" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", { required: "هذا الحقل مطلوب" })}
        />
      </FormRow>

      <FormRow label="البريد الإلكتروني" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          defaultValue={""}
          disabled={isPending}
          {...register("email", {
            required: "هذا الحقل مطلوب",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "البريد الإلكتروني غير صحيح",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="كلمة المرور (8 ارقام أو حروف)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          defaultValue={""}
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "هذا الحقل مطلوب",
            minLength: {
              value: 8,
              message: "كلمة المرور يجب ان تكون على الاقل 8 حروف",
            },
          })}
        />
      </FormRow>

      <FormRow label="اعد كلمة المرور" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "هذا الحقل مطلوب",
            validate: (value) =>
              getValues().password === value || "كلمة المرور غير متطابقة",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isPending}>
          إلغاء
        </Button>
        <Button disabled={isPending}>انشئ مستخدم جديد</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

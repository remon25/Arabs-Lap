import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard",{ replace: true });
    },
    onError: () => {
      toast.error("يوجد خطأ في البريد الالكتروني او كلمة المرور");
    },
  });

  return { login, isLogging };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isEditting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("setting Edited Successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSetting, isEditting };
}

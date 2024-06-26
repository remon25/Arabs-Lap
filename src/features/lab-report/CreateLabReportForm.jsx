import LapReportInput from "../../ui/LapReportInput";
import { LabForm } from "../../ui/LabReportForm";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { LabNotesFormRow } from "../../ui/FormRow";
import { useCreateLabReport } from "./useCreateLabReport";
import { useEditLabReport } from "./useEditLabReport";
import { useGetUserId } from "./useGetLabReport";
import { LabReportFormRow } from "../../ui/LabReportFormRow";

function CreateLabReportForm({ labReportToEdit = {}, onClose }) {
  const { isAdding, createLabReport } = useCreateLabReport();
  const { isEditting, editLabReport } = useEditLabReport();
  const isWorking = isEditting || isAdding;
  const { id: labReportId, ...editValues } = labReportToEdit;
  const { userId } = useGetUserId();
  const isEditSession = (function () {
    for (const prop in labReportToEdit) {
      if (Object.hasOwn(labReportToEdit, prop)) {
        return true;
      }
    }

    return false;
  })();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  console.log(isEditSession);
  console.log("lab report ID", labReportId);
  function onSubmit(data) {
    if (isEditSession) {
      // eslint-disable-next-line no-unused-vars
      const { sample_writer, ...dataWithoutSampleWriter } = data;
      editLabReport(
        { editedData: dataWithoutSampleWriter, id: labReportId },
        {
          onSuccess: () => [reset(), onClose?.()],
        }
      );
    } else {
      createLabReport(
        { ...data, sample_writer: userId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    }
    console.log(data);
  }
  // eslint-disable-next-line no-unused-vars
  function onError(errors) {}

  return (
    <LabForm
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <LabReportFormRow label="Turbidity" error={errors?.turbidity?.message}>
        <LapReportInput
          type="number"
          id="turbidity-inlet"
          placeholder="Inlet"
          disabled={isWorking}
          {...register("turbidity_inlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="turbidity-outlet"
          placeholder="Outlet"
          disabled={isWorking}
          {...register("turbidity_outlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </LabReportFormRow>
      <LabReportFormRow
        label="Free Chlorine"
        error={errors?.freeChlorine?.message}
      >
        <LapReportInput
          type="number"
          id="free-chlorine-inlet"
          placeholder="Inlet"
          disabled={isWorking}
          {...register("free_chlorine_inlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="free-chlorine-outlet"
          placeholder="Outlet"
          disabled={isWorking}
          {...register("free_chlorine_outlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </LabReportFormRow>
      <LabReportFormRow label="TDS" error={errors?.TDS?.message}>
        <LapReportInput
          type="number"
          id="TDS-inlet"
          placeholder="Inlet"
          disabled={isWorking}
          {...register("TDS_inlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="TDS-outlet"
          placeholder="Outlet"
          disabled={isWorking}
          {...register("TDS_outlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </LabReportFormRow>
      <LabReportFormRow label="Temp" error={errors?.Temp?.message}>
        <LapReportInput
          type="number"
          id="Temp-inlet"
          placeholder="Inlet"
          disabled={isWorking}
          {...register("temp_inlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="Temp-outlet"
          placeholder="Outlet"
          disabled={isWorking}
          {...register("temp_outlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </LabReportFormRow>
      <LabReportFormRow
        label="Conductivity"
        error={errors?.Conductivity?.message}
      >
        <LapReportInput
          type="number"
          id="conductivity-inlet"
          placeholder="Inlet"
          disabled={isWorking}
          {...register("conductivity_inlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="conductivity-outlet"
          placeholder="Outlet"
          disabled={isWorking}
          {...register("conductivity_outlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </LabReportFormRow>
      <LabReportFormRow label="PH" error={errors?.PH?.message}>
        <LapReportInput
          type="number"
          id="PH-inlet"
          placeholder="Inlet"
          disabled={isWorking}
          {...register("PH_inlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="PH-outlet"
          placeholder="Outlet"
          disabled={isWorking}
          {...register("PH_outlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </LabReportFormRow>
      <LabReportFormRow label="Iron" error={errors?.iron?.message}>
        <LapReportInput
          type="number"
          id="iron-inlet"
          placeholder="Inlet"
          disabled={isWorking}
          {...register("iron_inlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="iron-outlet"
          placeholder="Outlet"
          disabled={isWorking}
          {...register("iron_outlet", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </LabReportFormRow>

      <LabNotesFormRow label="التاريخ و الوقت">
        <LapReportInput
          type="datetime-local"
          id="date"
          step="1"
          {...register("sample_date", { required: "هذا الحقل مطلوب" })}
        />
      </LabNotesFormRow>
      <LabNotesFormRow label="ملاحظات" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("notes")}
        />
      </LabNotesFormRow>
      <LabReportFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          إلغاء
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "تعديل التقرير" : "اضف تقرير"}
        </Button>
      </LabReportFormRow>
    </LabForm>
  );
}

export default CreateLabReportForm;

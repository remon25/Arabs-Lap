import LapReportInput from "../../ui/LapReportInput";
import { OperationForm } from "../../ui/LabReportForm";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreateOpertaionReport } from "./useCreateOpertaionReport";
import { useEditOperationReport } from "./useEditOperationReport";
import { useGetUserId } from "./useGetOperationReport";
import {
  DoubleRow,
  LabReportFormRow,
  OperationReportFormRow,
  SingleRow,
} from "../../ui/LabReportFormRow";
import styled from "styled-components";

const StyledH4 = styled.h4`
  margin-bottom: 0.8rem;
  margin-top: 0.8rem;
`;

function CreateOperationReportForm({ operationReportToEdit = {}, onClose }) {
  const { isAdding, createOperationReport } = useCreateOpertaionReport();
  const { isEditting, editOperationReport } = useEditOperationReport();
  const isWorking = isEditting || isAdding;
  const { id: labReportId, ...editValues } = operationReportToEdit;
  const { userId } = useGetUserId();
  const isEditSession = (function () {
    for (const prop in operationReportToEdit) {
      if (Object.hasOwn(operationReportToEdit, prop)) {
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
      const { writer, ...dataWithoutSampleWriter } = data;
      editOperationReport(
        { editedData: dataWithoutSampleWriter, id: labReportId },
        {
          onSuccess: () => [reset(), onClose?.()],
        }
      );
    } else {
      createOperationReport(
        { ...data, writer: userId },
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
    <OperationForm
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
      style={{ direction: "rtl" }}
    >
      <StyledH4>التاريخ</StyledH4>
      <OperationReportFormRow>
        <LapReportInput
          type="datetime-local"
          id="date"
          step="1"
          {...register("التاريخ", { required: "هذا الحقل مطلوب" })}
        />
        <LapReportInput
          type="text"
          id="group-name"
          placeholder="اسم القروب"
          disabled={isWorking}
          {...register("اسم القروب", {
            required: "الحقل مطلوب",
          })}
        />
        <LapReportInput
          type="text"
          id="group-time"
          placeholder="وقت القروب"
          disabled={isWorking}
          {...register("وقت القروب", {
            required: "الحقل مطلوب",
          })}
        />
      </OperationReportFormRow>
      <SingleRow error={errors?.message}>
      <StyledH4>التشغيل</StyledH4>

        <Textarea
          type="text"
          id="operation"
          placeholder="التشغيل"
          disabled={isWorking}
          {...register("التشغيل", {
            required: "الحقل مطلوب",
          })}
        />
      </SingleRow>
      <SingleRow error={errors?.message}>
      <StyledH4>المولدات</StyledH4>
        <Textarea
          type="text"
          id="generators"
          placeholder="المولدات"
          disabled={isWorking}
          {...register("المولدات", {
            required: "الحقل مطلوب",
          })}
        />
      </SingleRow>
      <StyledH4>الانتاج</StyledH4>
      <DoubleRow error={errors?.message}>
        <LapReportInput
          type="number"
          id="water-quantity"
          placeholder="كمية المياه الخام"
          disabled={isWorking}
          {...register("كمية المياه الخام", {
            required: "الحقل مطلوب",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="production-quantity"
          placeholder="كمية الانتاج الفعلي"
          disabled={isWorking}
          {...register("كمية الانتاج الفعلي", {
            required: "الحقل مطلوب",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </DoubleRow>
      <DoubleRow error={errors?.message}>
        <LapReportInput
          type="number"
          id="export-quantity"
          placeholder="كمية التصدير خليص"
          disabled={isWorking}
          {...register("كمية التصدير خليص", {
            required: "الحقل مطلوب",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="complete-export-quantity"
          placeholder="كمية التصدير الكامل"
          disabled={isWorking}
          {...register("كمية التصدير الكامل", {
            required: "الحقل مطلوب",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </DoubleRow>
      <StyledH4>مدة التشغيل</StyledH4>
      <DoubleRow error={errors?.message}>
        <LapReportInput
          type="number"
          id="operation-duration"
          placeholder="مدة التشغيل"
          disabled={isWorking}
          {...register("مدة التشغيل", {
            required: "الحقل مطلوب",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </DoubleRow>
      <DoubleRow error={errors?.message}>
        <LapReportInput
          type="number"
          id="from -duration"
          placeholder="من الساعة"
          disabled={isWorking}
          {...register("من الساعة", {
            required: "الحقل مطلوب",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
        <LapReportInput
          type="number"
          id="to-duration"
          placeholder="الى الساعة"
          disabled={isWorking}
          {...register("الى الساعة", {
            required: "الحقل مطلوب",
            valueAsNumber: true,
          })}
          step="0.0001"
        />
      </DoubleRow>

      <SingleRow error={errors?.description?.message}>
        <Textarea
          type="text"
          id="notes"
          placeholder="ملاحظ"
          defaultValue=""
          disabled={isWorking}
          {...register("ملاحظ")}
        />
      </SingleRow>
      <LabReportFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          إلغاء
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "تعديل التقرير" : "اضف تقرير"}
        </Button>
      </LabReportFormRow>
    </OperationForm>
  );
}

export default CreateOperationReportForm;

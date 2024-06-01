import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Checkbooking from "../../ui/Checkbooking";

function CreateBookingForm({ onClose }) {
  const { createBooking, isAdding } = useCreateBooking();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  function onSubmit(data) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);

    let totalPrice = Number(data.cabinPrice) + Number(data.extrasPrice);
    createBooking(
      {
        created_at: new Date().toISOString().slice(0, -1),
        startDate: data.startDate,
        endDate: data.endDate,
        numNights: nights,
        numGuests: data.guests,
        cabinPrice: data.cabinPrice,
        extrasPrice: data.extrasPrice,
        totalPrice: totalPrice,
        status: data.status,
        hasBreakfast: data.breakfast,
        isPaid: data.isPaid,
        cabinId: data.cabinId,
        guestId: data.guestId,
      },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      }
    );
  }

  // eslint-disable-next-line no-unused-vars
  function onError(errors) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Guest ID" error={errors?.guestId?.message}>
        <Input
          disabled={isAdding}
          type="number"
          id="guestId"
          defaultValue={250}
          {...register("guestId", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin ID" error={errors?.cabinId?.message}>
        <Input
          disabled={isAdding}
          type="number"
          id="cabinId"
          defaultValue={142}
          {...register("cabinId", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          disabled={isAdding}
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
            validate: (value) => {
              const inputDate = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              inputDate.setHours(0, 0, 0, 0);

              return (
                inputDate >= today || "Start date should be at least today"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          disabled={isAdding}
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate: (value) => {
              const inputDate = new Date(value);
              const startDate = new Date(getValues().startDate);
              startDate.setHours(0, 0, 0, 0);
              inputDate.setHours(0, 0, 0, 0);

              return (
                inputDate > startDate || "End date should be after start date"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.guests?.message}>
        <Input
          disabled={isAdding}
          type="number"
          id="guests"
          {...register("guests", {
            required: "This field is required",
            min: { value: 1, message: "guests should be at least one" },
          })}
        />
      </FormRow>

      <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
        <Input
          disabled={isAdding}
          type="number"
          id="cabinPrice"
          defaultValue={0}
          {...register("cabinPrice", {
            required: "This field is required",
            min: { value: 1, message: "price should be at least one" },
          })}
        />
      </FormRow>
      <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
        <Input
          disabled={isAdding}
          type="number"
          id="extrasPrice"
          defaultValue={0}
          {...register("extrasPrice")}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <Input
          disabled={isAdding}
          type="text"
          id="status"
          defaultValue="unconfirmed"
          {...register("status", {
            required: "This field is required",
            validate: (value) => {
              let valid = value === "unconfirmed" || value === "checked-in";
              return valid || "status should be unconfirmed or checked-in";
            },
          })}
        />
      </FormRow>
      <FormRow label="Is paid" error={errors?.isPaid?.message}>
        <Checkbooking
          disabled={isAdding}
          type="checkbox"
          id="isPaid"
          {...register("isPaid")}
        />
      </FormRow>
      <FormRow label="Has Breakfast" error={errors?.breakfast?.message}>
        <Checkbooking
          disabled={isAdding}
          type="checkbox"
          id="breakfast"
          {...register("breakfast")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isAdding}
          variation="secondary"
          type="reset"
          onClick={() => onClose?.()}
        >
          Cancel
        </Button>
        <Button disabled={isAdding}>Add Booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;

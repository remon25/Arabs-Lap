import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  // eslint-disable-next-line no-unused-vars
  const { isPending, error, settings } = useSettings();
  const { updateSetting, isEditting } = useEditSetting();

  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
  } = settings || {};

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({
      [field]: value,
    });
  }

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isEditting}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isEditting}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isEditting}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isEditting}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

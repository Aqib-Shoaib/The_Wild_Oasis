import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const { isRetrieving, settings } = useSettings();
  const { updateSettings, isLoading } = useUpdateSettings();
  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
  } = settings;
  if (isRetrieving) return <Spinner />;
  function settingsUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSettings({
      ...settings,
      [field]: value,
    });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isLoading}
          onBlur={(e) => settingsUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isLoading}
          onBlur={(e) => settingsUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isLoading}
          onBlur={(e) => settingsUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isLoading}
          onBlur={(e) => settingsUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { getSettings } from "../../services/apiSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading: isRetrieving, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  const { updateSettings, isLoading } = useUpdateSettings();
  if (isRetrieving) return <Spinner />;
  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
  } = settings;
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

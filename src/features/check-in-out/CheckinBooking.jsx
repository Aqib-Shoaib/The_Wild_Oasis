import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { isLoading: isUpdating, mutate: checkin } = useCheckin();
  const { isRetrieving, settings } = useSettings();

  const { isLoading, data: booking = {} } = useBooking();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
  if (isLoading || isRetrieving) return <Spinner />;
  const {
    id: bookingId,
    Guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (confirmPaid) {
      const breakfastObj = {
        hasBreakfast: true,
        totalPrice: totalPrice + optionalBreakfastPrice,
      };
      if (addBreakfast) {
        checkin({ bookingId, breakfastObj });
      } else {
        checkin({ bookingId });
      }
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast || hasBreakfast}
          disabled={addBreakfast || hasBreakfast}
          onChange={() => {
            setAddBreakfast(!addBreakfast);
            setConfirmPaid(false);
          }}
          id="breakfast"
        >
          Want to Add breakfast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          id="confirm"
        >
          I Confirm that the Client {Guests.fullName} has paid the money of{" "}
          {addBreakfast || hasBreakfast
            ? formatCurrency(optionalBreakfastPrice + totalPrice)
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isUpdating}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

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
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const moveBack = useMoveBack();
  const { isLoading: isUpdating, mutate } = useCheckin();

  const { isLoading, data: booking = {} } = useBooking();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
  if (isLoading) return <Spinner />;
  const {
    id: bookingId,
    Guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  // console.log(booking);

  function handleCheckin() {
    if (confirmPaid) {
      mutate(bookingId);
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
          checked={confirmPaid}
          disabled={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          id="confirm"
        >
          I Confirm that the Client {Guests.fullName} has paid the money.
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

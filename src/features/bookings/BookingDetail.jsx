import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const { isLoading, data: booking = {} } = useBooking();
  const { isLoading: isCheckingOut, mutate: checkOut } = useCheckout();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;
  const { id, status } = booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            variation="secondary"
            sizes="small"
            onClick={() => checkOut(id)}
            disabled={isCheckingOut}
          >
            <HiArrowUpOnSquare /> <span>Check Out</span>
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

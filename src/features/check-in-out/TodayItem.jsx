/* eslint-disable react/prop-types */
import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { useNavigate } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 8rem 12rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ activity }) {
  const navigate = useNavigate();
  const { id, Guests, numNights, status } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Guest>{Guests.fullName}</Guest>
      <Guest>{numNights} night/s</Guest>
      {status === "unconfirmed" && (
        <Button sizes="small" onClick={() => navigate(`/checkin/${id}`)}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;

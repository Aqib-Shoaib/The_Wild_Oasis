/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isLoading, mutate } = useCheckout();
  return (
    <Button
      variation="primary"
      sizes="small"
      onClick={() => mutate(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;

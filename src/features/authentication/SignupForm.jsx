import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/
const Div = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: end;
  gap: 5px;
`;

function SignupForm() {
  const { isLoading, mutate } = useSignup();
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  // console.log(mutate);
  function onSubmit({ fullName, email, password }) {
    mutate({ fullName, email, password });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "This Field is Required!",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This Field is Required!",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please write a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This Field is Required!",
            minLength: {
              value: 8,
              message: "Password must be of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This Field is Required!",
            validate: (value) =>
              value === getValues().password || "The Password Doesn't Match !",
          })}
        />
      </FormRow>
      <Div>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </Div>
    </Form>
  );
}

export default SignupForm;

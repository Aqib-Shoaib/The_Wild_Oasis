import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUser from "./useUser";
import styled from "styled-components";
import useUpdatedUser from "./useUpdatedUser";
const Div = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: end;
  gap: 5px;
`;
function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    data: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { updateUser, isUpdating } = useUpdatedUser();
  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({ fullName, avatar });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <Input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          accept="image/*"
          id="avatar"
          disabled={isUpdating}
        />
      </FormRow>
      <Div>
        <Button type="reset" variation="secondary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </Div>
    </Form>
  );
}

export default UpdateUserDataForm;

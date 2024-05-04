import styled from "styled-components";

const Styledheader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 3px solid var(--color-grey-100);
`;

function Header() {
  return <Styledheader>Header</Styledheader>;
}

export default Header;

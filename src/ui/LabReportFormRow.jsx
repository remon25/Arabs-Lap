import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: 0.5fr 1fr 1fr;
  }
  @media screen and (max-width: 556px) {
    grid-template-columns: unset;
    grid-template-areas: "label label" "input-1 input-2";
    row-gap: 0.6rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
  @media screen and (max-width: 556px) {
    grid-area: label;
  }

`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;



export  function LabReportFormRow({ label, children, error }) {
  return (
    <StyledFormRow>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
export  function LabNotesFormRow({ label, children, error }) {
  return (
    <StyledFormRow style={{direction:'rtl',gridTemplateColumns: '1fr 11fr'}}>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
const StyledLabFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 0.5fr 0.5fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;




export default function FormRow({ label, children, error }) {
  return (
    <StyledLabFormRow>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledLabFormRow>
  );
}

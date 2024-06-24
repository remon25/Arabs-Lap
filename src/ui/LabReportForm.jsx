import styled, { css } from "styled-components";

const Form = styled.form`
  overflow: auto;
  @media screen and (max-width: 576px) {
    padding: 2.4rem 2rem;
  }

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  font-size: 1.4rem;
  @media screen and (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

Form.defaultProps = {
  type: "regular",
};

export const LabForm = styled.form`
  max-height: 90vh;
  max-height: 90svh;
  width: 50rem;
  direction: ltr;
  overflow-y: auto;
  @media screen and (max-width: 992px) {
    width: 60rem;
  }
  @media screen and (max-width: 776px) {
    width: 50rem;
  }
  @media screen and (max-width: 600px) {
    width: 40rem;
    max-height: 90vh;
    max-height: 90svh;
    overflow-y: auto;
  }
  @media screen and (max-width: 480px) {
    width: 25rem;
  }

  @media screen and (max-width: 576px) {
    padding: 2.4rem 2rem;
  }

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 90rem;
    `}
    
  font-size: 1.4rem;
  @media screen and (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

export default Form;

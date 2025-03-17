import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 500px;
  margin: 30px auto 0;
`;

export const Section = styled.div`
  width: 300px;
  display: flex;

  > div {
    width: 100%;
    margin-bottom: 30px;

    label {
      min-width: auto;
    }

    input {
      width: 100%;
    }
  }

  a,
  button {
    color: #333 !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    width: 100% !important;
    padding: 0 0 10px 0 !important;
    justify-content: flex-start;
    border-bottom: 1px solid #333;

    &:hover {
      color: #90d5ff !important;
      text-decoration: none !important;
    }
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

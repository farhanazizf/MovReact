import { TextField } from "@mui/material";
import styled from "styled-components";

const Styled = {
  SearchWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin: 3rem 0;
  `,
  Search: styled(TextField)`
    width: 60%;
  `,
  CardWrapper: styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  `,
  Card: styled.div`
    margin: 0.5rem 1rem;
  `,
  TitleWrapper: styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
  `,
};
export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Styled;

import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import styled from 'styled-components';
import Styled from "./style";

const MainLayout = ({ children }) => {
  const history = useHistory();
  const loading = useSelector((state) => state.loading);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Styled.FlexWrapper>
        {/* <Styled.NavbarWrapper>
          <p>Movies</p>
        </Styled.NavbarWrapper> */}
        <Styled.NavbarWrapper onClick={() => history.push("/")}>
          <p>Search Movies</p>
        </Styled.NavbarWrapper>
      </Styled.FlexWrapper>
      <Styled.ChildrenWrapper>{children}</Styled.ChildrenWrapper>
    </div>
  );
};

export default MainLayout;

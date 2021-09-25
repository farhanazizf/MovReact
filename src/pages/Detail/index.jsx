import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import http from "../../libs/http";
import MainLayout from "../../components/layout/MainLayout";
import Styled from "./style";
import { Button } from "@mui/material";

const MovieDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [movies, setMovies] = React.useState();

  React.useEffect(() => {
    const getDetailsMov = async () => {
      try {
        console.log(id);
        if (id === "") {
          history.push("/");
        } else {
          dispatch({ type: "LOADING_ON" });
          const { data } = await http.get(``, {
            params: {
              i: id,
              // page: pageNow,
            },
          });
          // console.log(data);
          if (data.Response !== "False") {
            // console.log(data);
            setMovies(data);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "LOADING_OFF" });
      }
    };
    getDetailsMov();
    // eslint-disable-next-line
  }, []);
  return (
    <MainLayout>
      {!loading ? (
        <Styled.MainWrapper>
          <div style={{ width: "20%" }}>
            <div className="col-md-4">
              <img src={movies?.Poster} className="card-img-top" alt="img" />
            </div>
          </div>
          <Styled.RightWrapper>
            {/* <div style={{ display: "flex", alignItems: "center", width: "100%" }}> */}
            <div className="col-md-9">
              <h2>
                {movies?.Title} ({movies?.imdbRating} / 10){" "}
              </h2>
            </div>

            <div className="col-md-3">
              <h3>
                {movies?.Production} ({movies?.Country})
              </h3>
            </div>
            {/* </div> */}
            <Styled.FlexWrapper>
              <p>Director</p>
              <Styled.TextBold> {movies?.Director}</Styled.TextBold>
            </Styled.FlexWrapper>
            <Styled.FlexWrapper>
              <p>Actors</p>
              <Styled.TextBold> {movies?.Actors}</Styled.TextBold>
            </Styled.FlexWrapper>
            <Styled.FlexWrapper>
              <p>Writers</p>
              <Styled.TextBold> {movies?.Writer}</Styled.TextBold>
            </Styled.FlexWrapper>
            <Styled.FlexWrapper>
              <p>Released</p>
              <Styled.TextBold> {movies?.Released}</Styled.TextBold>
            </Styled.FlexWrapper>
            <Styled.FlexWrapper>
              <p>Genre</p>
              <Styled.TextBold> {movies?.Genre}</Styled.TextBold>
            </Styled.FlexWrapper>
            <Styled.FlexWrapper>
              <p>Plot</p>
              <Styled.TextBold> {movies?.Plot}</Styled.TextBold>
            </Styled.FlexWrapper>
            <Button variant="contained" onClick={() => history.push("/")}>
              Back
            </Button>
          </Styled.RightWrapper>
        </Styled.MainWrapper>
      ) : null}
    </MainLayout>
  );
};
export default MovieDetails;

import React from "react";
import {
  // Autocomplete,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
// import { Autocomplete, TextField } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import MainLayout from "../../components/layout/MainLayout";
import http from "../../libs/http";
import Styled, { modalStyle } from "./style";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const reduxReducer = useSelector((state) => state);
  const [modals, setModals] = React.useState({ poster: "", show: false });
  const [firstData, setFirstData] = React.useState([]);
  const [pageNow, setPageNow] = React.useState(1);
  const [totalRes, setTotalRes] = React.useState("0");
  const [searchText, setSearchText] = React.useState("");
  const [valuez] = useDebounce(searchText, 600);

  React.useEffect(() => {
    const getListMov = async () => {
      try {
        const { data } = await http.get(``, {
          params: {
            s: valuez,
            page: pageNow,
          },
        });
        // console.log(data);
        if (data.Response !== "False") {
          if (data.totalResults === totalRes) {
            // console.log("xnow", data.Search);
            setFirstData((firstt) => [...firstt, ...data.Search]);
          } else {
            setFirstData(data.Search);
          }
          setTotalRes(data.totalResults);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "LOADING_OFF" });
      }
    };
    getListMov();
    // eslint-disable-next-line
  }, [valuez, pageNow]);

  window.onscroll = function () {
    // @var int totalPageHeight
    var totalPageHeight = document.body.scrollHeight;

    // @var int scrollPoint
    var scrollPoint = window.scrollY + window.innerHeight;

    // check if we hit the bottom of the page
    if (scrollPoint >= totalPageHeight) {
      // console.log("at the bottom");
      if (firstData.length > 0) {
        dispatch({ type: "LOADING_ON" });
        setPageNow(pageNow + 1);
      }
    }
  };

  const handleOpenModals = (poster) => {
    if (poster !== "N/A") {
      setModals({ show: true, poster });
    }
  };

  const handleDetails = (imdbId) => {
    dispatch({ type: "SELECT_IMDB", value: imdbId });
    history.push(`/details/${imdbId}`);
  };

  return (
    <MainLayout>
      <Modal
        open={modals.show}
        onClose={() => setModals({ poster: "", show: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {modals.poster !== "" ? (
            <CardMedia
              component="img"
              // height="140"
              image={modals.poster}
              alt="Poster"
            />
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              No poster in this movies
            </Typography>
          )}
        </Box>
      </Modal>

      <Styled.TitleWrapper>
        <h2>Search Movies</h2>
      </Styled.TitleWrapper>
      <Styled.SearchWrapper>
        {/* <Styled.Search
          // {...params}
          label="Search Movies"
          onChange={(ex) => setSearchText(ex.target.value)}
          InputProps={{
            // ...params.InputProps,
            type: "search",
          }}
        /> */}
        <Styled.Autocomplete
          freeSolo
          disableClearable
          onSelect={(ex) => setSearchText(ex.target.value)}
          options={firstData.map((option) => option.Title)}
          renderInput={(params) => (
            <Styled.Search
              {...params}
              onChange={(ex) => setSearchText(ex.target.value)}
              label="Search Movies"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Styled.SearchWrapper>
      <Styled.CardWrapper>
        {firstData.map((vals, i) => (
          <Styled.Card key={`${vals.imdbID}${i}`}>
            <Card sx={{ width: 345 }}>
              <CardActionArea onClick={() => handleOpenModals(vals.Poster)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={vals.Poster}
                  alt="poster"
                />
              </CardActionArea>
              <CardActionArea onClick={() => handleDetails(vals.imdbID)}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {vals.Title} ({vals.Year})
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Styled.Card>
        ))}
      </Styled.CardWrapper>
    </MainLayout>
  );
};

const mapsStateToProps = (state) => {
  return {
    vals: state.value,
  };
};

export default connect(mapsStateToProps)(Home);
